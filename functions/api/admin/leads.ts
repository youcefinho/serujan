// Cloudflare Pages Function — Lire les leads (admin protégé)
// Route : GET /api/admin/leads
// Vérifie le token admin dans le header Authorization

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    // Vérifier le token admin
    const authHeader = context.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Non autorisé' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token || token.length < 10) {
      return new Response(JSON.stringify({ error: 'Token invalide' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Récupérer les leads triés par date
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM leads ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify({ data: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lecture leads:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
