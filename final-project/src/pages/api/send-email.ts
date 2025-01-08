import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

const SENDER = "kazuki.castle0418@gmail.com";

// @ts-ignore
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { to, subject, text, from } = body;

    const msg = {
      to,
      subject,
      text,
      from,
    };

    await sgMail.send(msg);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Failed to send email.', error: error.message }),
        { status: 500 }
      );
    }
  }
};
