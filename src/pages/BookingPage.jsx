import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { getDay, format } from 'date-fns';

import 'react-calendar/dist/Calendar.css';

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
  max-width: 900px;
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

const BookingLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    min-width: 400px;
    border: 1px solid #333;
    background: #1a1a1f;
    font-family: 'Satoshi-Regular', sans-serif;
    border-radius: 8px;
  }

  .react-calendar__navigation button {
    color: #EFEFEF;
    font-size: 1.2rem;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #333;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #888;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: bold;
    text-decoration: none;
  }

  .react-calendar__tile {
    color: #EFEFEF;
    background: none;
    border-radius: 4px;
    height: 60px;
  }
  
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #333;
  }
  
  .react-calendar__tile--now {
    background: #3a3f46;
    color: #fff;
  }

  .react-calendar__tile--active {
    background: #6B7280 !important;
    color: white;
  }

  .react-calendar__tile--disabled {
    color: #555;
    background: none;
  }
`;

const TimeSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 300px;
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const TimeSlotButton = styled.button`
  padding: 1rem;
  background-color: ${props => props.selected ? '#6B7280' : '#1a1a1f'};
  color: #EFEFEF;
  border: 1px solid #333;
  border-radius: 8px;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #333;
    border-color: #555;
  }

  &:disabled {
    background-color: #101014;
    color: #444;
    cursor: not-allowed;
    border-color: #222;
  }
`;

const Message = styled.p`
    text-align: center;
    font-size: 1rem;
    font-family: 'Satoshi-Regular', sans-serif;
    color: ${props => (props.type === 'success' ? '#4ade80' : '#f87171')};
`;

const Select = styled.select`
  padding: 1rem;
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
`;


const BookingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [occupiedTimes, setOccupiedTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchOccupiedTimes = async () => {
      setIsLoadingTimes(true);
      setOccupiedTimes([]); // Reset on date change
      
      const formattedDate = format(date, 'yyyy-MM-dd');

      try {
        const response = await fetch(`/api/get-occupied-times?date=${formattedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch time slots.');
        }
        const data = await response.json();
        setOccupiedTimes(data);
      } catch (error) {
        console.error("Error fetching occupied times:", error);
        // Optionally set an error message for the user
      } finally {
        setIsLoadingTimes(false);
      }
    };

    fetchOccupiedTimes();
  }, [date]);


  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  
  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime(null);
  };

  const meetingPurposes = [
    'General Inquiry',
    'Project Proposal',
    'Technical Consultation',
    'Partnership Opportunity',
    'Follow-up',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      setMessage({ type: 'error', text: 'Please select a date and time.' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);

    const [hours, minutes] = selectedTime.split(':');
    const finalDateTime = new Date(date);
    finalDateTime.setHours(parseInt(hours, 10));
    finalDateTime.setMinutes(parseInt(minutes, 10));
    finalDateTime.setSeconds(0);
    finalDateTime.setMilliseconds(0);

    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          dateTime: finalDateTime.toISOString(),
          purpose,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: 'Booking successful! Check your email for confirmation.' });
      setName('');
      setEmail('');
      setDate(new Date());
      setSelectedTime(null);

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
        <Select value={purpose} onChange={(e) => setPurpose(e.target.value)} required>
          <option value="" disabled>Select a reason for the meeting</option>
          {meetingPurposes.map(p => <option key={p} value={p}>{p}</option>)}
        </Select>
        <Textarea
          placeholder="Please provide a brief description of what you'd like to discuss."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <BookingLayout>
          <CalendarWrapper>
            <Calendar
              onChange={handleDateChange}
              value={date}
              minDate={new Date()}
              tileDisabled={({ date }) => !isWeekday(date)}
            />
          </CalendarWrapper>
          <TimeSelectionWrapper>
            <h3>Select a Time</h3>
            {isLoadingTimes ? (
              <p>Loading available times...</p>
            ) : (
              <TimeSlotsGrid>
                {availableTimes.map((time) => (
                  <TimeSlotButton
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    selected={selectedTime === time}
                    disabled={occupiedTimes.includes(time)}
                  >
                    {time}
                  </TimeSlotButton>
                ))}
              </TimeSlotsGrid>
            )}
          </TimeSelectionWrapper>
        </BookingLayout>

        <Button type="submit" disabled={isSubmitting || !selectedTime || !name || !email || !purpose}>
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </Form>
      {message && <Message type={message.type}>{message.text}</Message>}
    </BookingContainer>
  );
};

export default BookingPage; 