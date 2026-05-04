// Worker principal Serujan v2 — assets statiques
//
// Architecture v2 (mai 2026) — Site Forms GHL embed.
// Les leads sont désormais capturés via le widget GHL Site Form embed dans le React.
// Le Worker ne sert plus qu'à servir les assets statiques (build Vite dans dist/)
//
// Headers de sécurité statiques : voir public/_headers (CSP + HSTS + X-Frame-Options).

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Routes API (s'il en restait)
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Endpoint inconnu' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
        },
      });
    }

    // Tout le reste → géré par le binding ASSETS de Cloudflare
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
