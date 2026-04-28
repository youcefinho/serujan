// Cloudflare Pages Function — API pour envoyer le guide gratuit
// Route : POST /api/send-guide
// Utilise Cloudflare D1 pour sauvegarder le lead + Resend pour l'email

import { Resend } from 'resend';

interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { prenom, email } = await context.request.json() as { prenom?: string; email?: string };

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sauvegarder le lead dans D1 (best-effort — ne bloque pas l'envoi d'email)
    try {
      const id = crypto.randomUUID();
      await context.env.DB.prepare(
        'INSERT INTO leads (id, name, email, phone, message, type) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(id, prenom || 'Lead Magnet', email, '', 'Guide Gratuit du Premier Acheteur — téléchargé via Lead Magnet', 'buy').run();
    } catch (dbErr) {
      console.warn('Échec sauvegarde lead D1:', dbErr);
    }

    // Envoyer l'email via Resend
    const resend = new Resend(context.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Mathis Guimont <onboarding@resend.dev>',
      to: [email],
      subject: '🏠 Votre Guide Gratuit du Premier Acheteur à Gatineau est prêt !',
      html: `
        <div style="background-color: #ffffff; color: #1a1a1a; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 20px; max-width: 600px; margin: 0 auto; line-height: 1.6; border: 1px solid #f0f0f0; border-radius: 12px;">
          <h2 style="color: #1a1a1a; font-size: 22px; margin-bottom: 24px; font-weight: bold;">Bonjour ${prenom || ''},</h2>
          <p style="margin-bottom: 24px; font-size: 16px;">Merci de votre intérêt ! Votre guide gratuit est prêt à être consulté.</p>
          
          <div style="background-color: #f9f9f9; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0 0 12px 0; font-weight: bold; color: #1a1a1a;">À l'intérieur vous trouverez :</p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px;">✅ Les 5 erreurs les plus courantes à éviter</li>
              <li style="margin-bottom: 10px;">✅ Le vrai coût d'achat à Gatineau</li>
              <li style="margin-bottom: 0;">✅ Le processus étape par étape pour acheter sereinement</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="https://drive.google.com/file/d/1dzYfbnMTxe5sO9C78E_PaTx-9bblW0C3/view?usp=drive_link" target="_blank" rel="noopener noreferrer" style="background-color: #E63946; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Accéder à mon guide gratuit
            </a>
          </div>
          
          <p style="margin-bottom: 32px; font-size: 15px; color: #4a4a4a;">Ce guide a été préparé spécialement pour vous aider à réussir votre premier achat immobilier à Gatineau.</p>
          
          <div style="border-top: 1px solid #eeeeee; padding-top: 24px;">
            <p style="margin: 0; font-weight: bold; color: #1a1a1a;">À très bientôt,</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #1a1a1a;"><strong>Mathis Guimont</strong></p>
            <p style="margin: 2px 0 0 0; color: #666666; font-size: 14px;">Courtier Immobilier — Gatineau</p>
            <p style="margin: 4px 0 0 0;"><a href="https://mathis-guimont.ca" style="color: #E63946; text-decoration: none; font-size: 14px; font-weight: 500;">mathis-guimont.ca</a></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur fonction:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
