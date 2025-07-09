import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
  Preview,
} from '@react-email/components';

export const BookingConfirmationEmail = ({ name, dateTime }) => (
  <Html>
    <Head />
    <Preview>Your meeting with Annorak is confirmed.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Booking Confirmed</Heading>
        <Text style={paragraph}>
          Hi {name},
        </Text>
        <Text style={paragraph}>
          This is a confirmation that your discovery call with Annorak Intelligence Group is scheduled for{' '}
          <strong>{new Date(dateTime).toLocaleString()}</strong>.
        </Text>
        <Text style={paragraph}>
          We look forward to speaking with you.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default BookingConfirmationEmail;

// Styles are similar to NewBookingEmail, can be refactored later
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const heading = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 20px',
  textAlign: 'center',
}; 