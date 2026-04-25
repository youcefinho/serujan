import type { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_9PGVvdq6_KshLe9eo16U8sZHKr4MUUjAf');

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prenom, email } = JSON.parse(event.body || '{}');

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email requis' }) };
    }

    const fromEmail = 'onboarding@resend.dev'; // Fallback safer for unverified domains
    
    const { data, error } = await resend.emails.send({
      from: `Mathis Guimont <${fromEmail}>`,
      to: [email],
      subject: 'Votre Guide Gratuit du Premier Acheteur à Gatineau',
      html: `Bonjour ${prenom || ''}, voici votre guide gratuit : <a href="https://drive.google.com/file/d/1dzYfbnMTxe5sO9C78E_PaTx-9bblW0C3/view?usp=drive_link">https://drive.google.com/file/d/1dzYfbnMTxe5sO9C78E_PaTx-9bblW0C3/view?usp=drive_link</a>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return { statusCode: 500, body: JSON.stringify({ error }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
