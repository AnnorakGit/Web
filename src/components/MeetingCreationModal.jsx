import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1a1a1f;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 1.8rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #EFEFEF;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  background-color: #0b0b0f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 1rem;
  background-color: #0b0b0f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  background-color: #0b0b0f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: #6B7280;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
`;

const MeetingCreationModal = ({ isOpen, onClose, onMeetingCreated }) => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    date: '',
    time: '',
    meeting_purpose: 'Internal',
    meeting_description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { date, time, ...rest } = formData;
    const dateTime = new Date(`${date}T${time}:00`);

    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.client_name,
          email: formData.client_email,
          dateTime: dateTime.toISOString(),
          purpose: formData.meeting_purpose,
          description: formData.meeting_description,
          isInternal: true // Flag to skip email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }
      
      const newMeeting = await response.json();
      onMeetingCreated(newMeeting.data); // Assuming API returns the created meeting
      onClose();

    } catch (error) {
      console.error(error);
      alert('Error: Could not create the meeting.');
    }
  };

  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Create New Meeting</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="client_name" placeholder="Client Name" onChange={handleChange} required />
          <Input type="email" name="client_email" placeholder="Client Email" onChange={handleChange} required />
          <Input type="date" name="date" onChange={handleChange} required />
          <Select name="time" onChange={handleChange} required>
            <option value="">Select a time</option>
            {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
          <Input type="text" name="meeting_purpose" placeholder="Meeting Purpose" value={formData.meeting_purpose} onChange={handleChange} />
          <Textarea name="meeting_description" placeholder="Description..." onChange={handleChange}></Textarea>
          <SubmitButton type="submit">Create Meeting</SubmitButton>
        </Form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default MeetingCreationModal; 