import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, getDay } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

const BookingContainer = styled.div`
  min-height: 100vh;
  padding: 150px 5%;
  background-color: #0B0B0F;
  color: #EFEFEF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 1rem;
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #6B7280; // Techy blue-gray
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5a616b;
  }
  &:disabled {
    background-color: #4a5058;
    cursor: not-allowed;
  }
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 1rem;
    background-color: #1a1a1f;
    border: 1px solid #333;
    border-radius: 8px;
    color: #EFEFEF;
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 1rem;
  }
  
  /* Simple dark theme for the calendar */
  .react-datepicker {
    background-color: #1a1a1f;
    border-color: #333;
  }
  .react-datepicker__header {
    background-color: #1a1a1f;
    border-bottom-color: #333;
  }
  .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker__day-name {
    color: #EFEFEF;
  }
  .react-datepicker__day {
    color: #EFEFEF;
    &:hover {
      background-color: #333;
    }
  }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background-color: #6B7280;
  }
  .react-datepicker__day--disabled {
    color: #555;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    background-color: #6B7280 !important;
  }
`;

const Message = styled.p`
    text-align: center;
    font-size: 1rem;
    font-family: 'Satoshi-Regular', sans-serif;
    color: ${props => (props.type === 'success' ? '#4ade80' : '#f87171')};
`;

const BookingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate) {
      setMessage({ type: 'error', text: 'Please select a date and time.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          dateTime: startDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: 'Booking successful! Check your email for confirmation.' });
      setName('');
      setEmail('');
      setStartDate(null);

    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookingContainer>
      <Title>Book a Discovery Call</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          placeholder="Your Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <Input 
          type="email" 
          placeholder="Your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <DatePickerWrapper>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            filterDate={isWeekday}
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 0), 17)}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select a date and time"
          />
        </DatePickerWrapper>
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
        </Button>
      </Form>
      {message && <Message type={message.type}>{message.text}</Message>}
    </BookingContainer>
  );
};

export default BookingPage; 