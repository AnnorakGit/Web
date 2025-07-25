import { Resend } from 'resend';
import { parseISO, format } from 'date-fns';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for server-side usage
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This check is crucial for serverless functions
  throw new Error("Supabase credentials are not defined in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    const { name, email, dateTime, purpose, description, isInternal } = req.body;

    if (!name || !email || !dateTime || !purpose) {
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
    
    let savedMeeting; // Variable to hold the new meeting data

    // --- Save the booking to the database ---
    try {
      const { data, error: dbError } = await supabase
        .from('meetings')
        .insert([
          { 
            client_name: name, 
            client_email: email, 
            meeting_time: dateTime,
            meeting_purpose: purpose,
            meeting_description: description,
          }
        ])
        .select() // This is crucial to return the inserted row
        .single(); // Return as a single object, not an array

      if (dbError) {
        throw dbError;
      }
      savedMeeting = data; // Store the returned data
    } catch (error) {
      console.error('Database insertion error:', error);
      return res.status(500).json({ error: 'Failed to create the meeting in the database.' });
    }

    // --- Conditionally send emails ---
    if (!isInternal) {
      // Attempt to send internal notification
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          subject: `New Booking from ${name}`,
          html: personalizedNewBookingEmail,
        });
        // results.internal_notification = { status: 'success' }; // This line was removed as per new_code
      } catch (error) {
        console.error('Failed to send internal notification:', error);
        // results.internal_notification = { status: 'failed', error: error.message }; // This line was removed as per new_code
      }

      // Attempt to send client confirmation
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: 'Your Meeting with Annorak is Confirmed',
          html: personalizedConfirmationEmail,
        });
        // results.client_confirmation = { status: 'success' }; // This line was removed as per new_code
      } catch (error) {
        console.error('Failed to send client confirmation:', error);
        // results.client_confirmation = { status: 'failed', error: error.message }; // This line was removed as per new_code
      }
    }

    // Return a success response with the new meeting data
    res.status(200).json({ message: 'Booking successful!', data: savedMeeting });

  } catch (error) {
    console.error('Critical error in /api/book-meeting:', {
        errorMessage: error.message,
        errorStack: error.stack,
    });
    return res.status(500).json({ error: 'An unexpected internal error occurred.' });
  }
} 