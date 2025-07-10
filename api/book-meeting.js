import { Resend } from 'resend';
import path from 'path';
import fs from 'fs/promises';
import { parseISO, format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  // Check for POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, dateTime } = req.body;

    if (!name || !email || !dateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // --- Format the date for human-readable output using date-fns ---
    const date = parseISO(dateTime); // Safely parse the ISO string
    const formattedDateTime = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");


    // --- 1. Read HTML templates ---
    const newBookingTemplatePath = path.join(process.cwd(), 'out', 'NewBookingEmail.html');
    const confirmationTemplatePath = path.join(process.cwd(), 'out', 'BookingConfirmationEmail.html');

    const newBookingTemplate = await fs.readFile(newBookingTemplatePath, 'utf-8');
    const confirmationTemplate = await fs.readFile(confirmationTemplatePath, 'utf-8');

    // --- 2. Personalize templates ---
    const personalizedNewBookingEmail = newBookingTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{dateTime}}/g, formattedDateTime);

    const personalizedConfirmationEmail = confirmationTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{dateTime}}/g, formattedDateTime);


    // --- 3. Send emails with HTML content ---
    
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
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 