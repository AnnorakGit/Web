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
    // Read the body ONCE and store its values in constants.
    const { name, email, dateTime } = req.body;

    // Validate the received data.
    if (!name || !email || !dateTime) {
      console.error('Validation failed. Missing data.', { name, email, dateTime });
      return res.status(400).json({ error: 'Missing required fields: name, email, or dateTime.' });
    }

    // Format the date for human-readable output using date-fns
    const date = parseISO(dateTime); // Safely parse the ISO string
    const formattedDateTime = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");

    // Read HTML templates
    const newBookingTemplatePath = path.join(process.cwd(), 'out', 'NewBookingEmail.html');
    const confirmationTemplatePath = path.join(process.cwd(), 'out', 'BookingConfirmationEmail.html');

    const newBookingTemplate = await fs.readFile(newBookingTemplatePath, 'utf-8');
    const confirmationTemplate = await fs.readFile(confirmationTemplatePath, 'utf-8');

    // Personalize templates with the constants
    const personalizedNewBookingEmail = newBookingTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{dateTime}}/g, formattedDateTime);

    const personalizedConfirmationEmail = confirmationTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{dateTime}}/g, formattedDateTime);

    // --- Send Final Emails ---

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
    console.error('Error in /api/book-meeting:', {
        errorMessage: error.message,
        errorStack: error.stack,
        requestBody: req.body, // This might be empty here, which is expected if the error is post-parsing
    });
    return res.status(500).json({ error: 'An internal error occurred.' });
  }
} 