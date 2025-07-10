import { Resend } from 'resend';
import path from 'path';
import fs from 'fs/promises';
import { parseISO, format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // --- START DEBUGGING ---
    // Let's send a debug email to see exactly what the server is receiving.
    const debugData = {
      message: "This is a debug email for the Annorak booking form.",
      timestamp: new Date().toISOString(),
      request: {
        headers: req.headers,
        body: req.body,
        method: req.method,
        url: req.url,
      },
    };

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail], // Send it to yourself
      subject: 'Annorak Booking - DEBUG DATA',
      html: `<pre>${JSON.stringify(debugData, null, 2)}</pre>`,
    });
    // --- END DEBUGGING ---


    const { name, email, dateTime } = req.body;

    if (!name || !email || !dateTime) {
      // Still return an error to the frontend if fields are missing
      // The debug email will be sent regardless.
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const date = parseISO(dateTime);
    const formattedDateTime = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");

    const newBookingTemplatePath = path.join(process.cwd(), 'out', 'NewBookingEmail.html');
    const confirmationTemplatePath = path.join(process.cwd(), 'out', 'BookingConfirmationEmail.html');

    const newBookingTemplate = await fs.readFile(newBookingTemplatePath, 'utf-8');
    const confirmationTemplate = await fs.readFile(confirmationTemplatePath, 'utf-8');

    const personalizedNewBookingEmail = newBookingTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{dateTime}}/g, formattedDateTime);

    const personalizedConfirmationEmail = confirmationTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{dateTime}}/g, formattedDateTime);

    // Email to Annorak (Internal Notification)
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Booking from ${name}`,
      html: personalizedNewBookingEmail,
    });

    // Email to the Client (Confirmation)
    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Your Meeting with Annorak is Confirmed',
      html: personalizedConfirmationEmail,
    });

    return res.status(200).json({ message: 'Emails sent successfully!' });

  } catch (error) {
    // Also send an email if an error occurs
    await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: 'Annorak Booking - ERROR',
        html: `<p>An error occurred:</p><pre>${JSON.stringify({
            errorMessage: error.message,
            errorStack: error.stack,
            requestBody: req.body,
        }, null, 2)}</pre>`,
    });

    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 