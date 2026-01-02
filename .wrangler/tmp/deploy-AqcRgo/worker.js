// src/worker.ts
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }
    if (url.pathname.includes(".")) {
      return assetResponse;
    }
    const indexUrl = new URL("/index.html", url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
