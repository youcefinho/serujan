// Cloudflare Pages Function — API pour sauvegarder un lead
// Route : POST /api/leads
// Utilise Cloudflare D1 (pas Supabase)

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { name, email, phone, message, type } = await context.request.json() as {
      name: string;
      email: string;
      phone?: string;
      message?: string;
      type?: 'buy' | 'sell';
    };

    if (!email || !name) {
      return new Response(JSON.stringify({ error: 'Nom et email requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = crypto.randomUUID();
    await context.env.DB.prepare(
      'INSERT INTO leads (id, name, email, phone, message, type) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(id, name, email, phone || '', message || '', type || 'buy').run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur sauvegarde lead:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
