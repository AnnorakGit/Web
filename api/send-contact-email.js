import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Message from your Website</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}; 