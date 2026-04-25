import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // Parse the payload sent by Netlify when a form is submitted
  const body = JSON.parse(event.body || '{}');
  const payload = body.payload;

  // Only trigger for the lead magnet form
  if (payload && payload.form_name === 'guide-premier-acheteur') {
    const email = payload.data.email;
    const name = payload.data.prenom || 'futur acheteur';

    try {
      // Trigger the Netlify Email Integration
      const response = await fetch(`${process.env.URL}/.netlify/functions/emails/guide-download`, {
        headers: {
          'netlify-emails-secret': process.env.NETLIFY_EMAILS_SECRET as string,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          from: 'info@mathisguimont.com',
          to: email,
          subject: 'Voici votre Guide Gratuit du Premier Acheteur 📖',
          parameters: {
            name: name,
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to send email via Netlify Email Integration:', await response.text());
        return { statusCode: 500, body: 'Failed to send email' };
      }

      console.log(`Email successfully sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      return { statusCode: 500, body: 'Internal Server Error' };
    }
  }

  // Always return 200 so Netlify knows the function executed successfully
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Submission processed successfully' }),
  };
};
