import { Resend } from 'resend';
import { NewBookingEmail } from '../emails/NewBookingEmail.js';
import { BookingConfirmationEmail } from '../emails/BookingConfirmationEmail.js';

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

    // Email to Annorak (Internal Notification)
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Booking from ${name}`,
      react: NewBookingEmail({ name, email, dateTime }),
    });

    // Email to the Client (Confirmation)
    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Your Meeting with Annorak is Confirmed',
      react: BookingConfirmationEmail({ name, dateTime }),
    });

    return res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 