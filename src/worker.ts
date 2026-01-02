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
