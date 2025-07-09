import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Text,
} from '@react-email/components';

export const NewBookingEmail = ({ name, email, dateTime }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Meeting Booking</Heading>
        <Text style={paragraph}>A new discovery call has been booked.</Text>
        <Text style={info}>
          <strong>Name:</strong> {name}
        </Text>
        <Text style={info}>
          <strong>Email:</strong> {email}
        </Text>
        <Text style={info}>
          <strong>Time:</strong> {new Date(dateTime).toLocaleString()}
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewBookingEmail;

// Styles
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
  textAlign: 'center',
};

const info = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 20px',
}; 