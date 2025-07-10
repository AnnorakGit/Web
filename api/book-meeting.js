import { Resend } from 'resend';
import { parseISO, format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

// --- Email Templates embedded directly in the code ---

const newBookingTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; }
    .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
    .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .content { font-size: 16px; }
    .info { margin: 20px 0; }
    .info p { margin: 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Meeting Booking</div>
    <div class="content">
      <p>A new discovery call has been booked. Please follow up soon.</p>
      <div class="info">
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Time:</strong> {{dateTime}}</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const confirmationTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; }
    .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
    .header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .content { font-size: 16px; }
    .info { margin: 20px 0; }
    .info p { margin: 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Your Booking is Confirmed!</div>
    <div class="content">
      <p>Hello {{name}},</p>
      <p>Thank you for booking a discovery call with Annorak. Your meeting is scheduled and confirmed.</p>
      <div class="info">
        <p><strong>Meeting Time:</strong> {{dateTime}}</p>
      </div>
      <p>We look forward to speaking with you.</p>
    </div>
  </div>
</body>
</html>
`;


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, dateTime } = req.body;

    if (!name || !email || !dateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const date = parseISO(dateTime);
    const formattedDateTime = format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");

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
    console.error('Final error in /api/book-meeting:', {
        errorMessage: error.message,
        errorStack: error.stack,
    });
    return res.status(500).json({ error: 'An internal error occurred.' });
  }
} 