interface Env {
  ASSETS: Fetcher;
  R2_ACCOUNT_ID: string;
  R2_BUCKET: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_SIGNED_URL_TTL_SECONDS?: string;
}

const R2_SERVICE = "s3";
const R2_REGION = "auto";

function encodeRfc3986(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (c) =>
    `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeRfc3986(segment))
    .join("/");
}

async function hmacSha256(key: ArrayBuffer | Uint8Array | string, data: string) {
  const keyData =
    typeof key === "string"
      ? new TextEncoder().encode(key)
      : key instanceof Uint8Array
        ? key
        : new Uint8Array(key);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
}

async function sha256Hex(data: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data)
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getSigningKey(secret: string, dateStamp: string) {
  const kDate = await hmacSha256(`AWS4${secret}`, dateStamp);
  const kRegion = await hmacSha256(kDate, R2_REGION);
  const kService = await hmacSha256(kRegion, R2_SERVICE);
  return hmacSha256(kService, "aws4_request");
}

async function listObjects(env: Env, prefix: string): Promise<string[]> {
  const host = `${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${encodeRfc3986(env.R2_BUCKET)}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/${R2_REGION}/${R2_SERVICE}/aws4_request`;

  const params = [
    ["list-type", "2"],
    ["prefix", prefix],
  ];

  const canonicalQuery = params
    .map(([k, v]) => `${encodeRfc3986(k)}=${encodeRfc3986(v)}`)
    .sort((a, b) => a.localeCompare(b))
    .join("&");

  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:UNSIGNED-PAYLOAD\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest = [
    "GET",
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = await getSigningKey(env.R2_SECRET_ACCESS_KEY, dateStamp);
  const signatureBuffer = await hmacSha256(signingKey, stringToSign);
  const signature = [...new Uint8Array(signatureBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const authorization = `AWS4-HMAC-SHA256 Credential=${env.R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(`https://${host}${canonicalUri}?${canonicalQuery}`, {
    headers: {
      Authorization: authorization,
      "x-amz-content-sha256": "UNSIGNED-PAYLOAD",
      "x-amz-date": amzDate,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list objects: ${response.status}`);
  }

  const xml = await response.text();
  const keys: string[] = [];
  const keyRegex = /<Key>([^<]+)<\/Key>/g;
  let match;
  while ((match = keyRegex.exec(xml)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

function parseVersion(filename: string): number[] | null {
  // Extract version from filename like "Getout-0.2.0-macos.dmg"
  const match = filename.match(/Getout-(\d+)\.(\d+)\.(\d+)-/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

function compareVersions(a: number[], b: number[]): number {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

async function getLatestRelease(env: Env): Promise<string | null> {
  const keys = await listObjects(env, "releases/");

  let latestKey: string | null = null;
  let latestVersion: number[] | null = null;

  for (const key of keys) {
    const version = parseVersion(key);
    if (version && (!latestVersion || compareVersions(version, latestVersion) > 0)) {
      latestVersion = version;
      latestKey = key;
    }
  }

  return latestKey;
}

async function generatePresignedUrl(
  env: Env,
  objectKey: string,
  expiresSeconds: number
): Promise<string> {
  const host = `${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const encodedKey = encodePath(objectKey);
  const canonicalUri = `/${encodeRfc3986(env.R2_BUCKET)}/${encodedKey}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/${R2_REGION}/${R2_SERVICE}/aws4_request`;

  const params = [
    ["X-Amz-Algorithm", "AWS4-HMAC-SHA256"],
    ["X-Amz-Credential", `${env.R2_ACCESS_KEY_ID}/${credentialScope}`],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", String(expiresSeconds)],
    ["X-Amz-SignedHeaders", "host"],
  ];

  const canonicalQuery = params
    .map(([k, v]) => `${encodeRfc3986(k)}=${encodeRfc3986(v)}`)
    .join("&");

  const canonicalHeaders = `host:${host}\n`;
  const canonicalRequest = [
    "GET",
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = await getSigningKey(env.R2_SECRET_ACCESS_KEY, dateStamp);
  const signatureBuffer = await hmacSha256(signingKey, stringToSign);
  const signature = [...new Uint8Array(signatureBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `https://${host}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle /download/latest - find and redirect to the latest release
    if (url.pathname === "/download/latest") {
      try {
        const latestKey = await getLatestRelease(env);
        if (!latestKey) {
          return new Response("No releases found", { status: 404 });
        }

        const ttl =
          Number(env.R2_SIGNED_URL_TTL_SECONDS) > 0
            ? Number(env.R2_SIGNED_URL_TTL_SECONDS)
            : 300;

        const signedUrl = await generatePresignedUrl(env, latestKey, ttl);
        return Response.redirect(signedUrl, 302);
      } catch (err) {
        console.error("Failed to get latest release", err);
        return new Response("Failed to get latest release", { status: 500 });
      }
    }

    // Handle /download/{objectKey} - redirect to specific file
    if (url.pathname.startsWith("/download/")) {
      const objectKey = url.pathname.replace("/download/", "");
      if (!objectKey) {
        return new Response("Missing object key", { status: 400 });
      }

      const ttl =
        Number(env.R2_SIGNED_URL_TTL_SECONDS) > 0
          ? Number(env.R2_SIGNED_URL_TTL_SECONDS)
          : 300;

      try {
        const signedUrl = await generatePresignedUrl(env, objectKey, ttl);
        return Response.redirect(signedUrl, 302);
      } catch (err) {
        console.error("Failed to generate signed URL", err);
        return new Response("Failed to generate signed URL", { status: 500 });
      }
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return assetResponse;
  },
};
