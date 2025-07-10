import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { supabase } from '../supabaseClient';
// import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 120px 5%;
  background-color: #0B0B0F;
  color: #EFEFEF;
`;

const Title = styled.h1`
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 80px;
  right: 5%;
  padding: 0.5rem 1rem;
  background-color: #4a5058;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-family: 'Satoshi-Regular', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #6B7280;
  }
`;

const MeetingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #333;
    font-family: 'Satoshi-Regular', sans-serif;
  }

  th {
    font-family: 'Satoshi-Bold', sans-serif;
    font-size: 1rem;
    color: #888;
  }
`;

// Mock data until we connect the API
const mockMeetings = [
  { id: 1, client_name: 'John Doe', client_email: 'john@example.com', meeting_time: '2024-08-15T10:00:00.000Z' },
  { id: 2, client_name: 'Jane Smith', client_email: 'jane@example.com', meeting_time: '2024-08-15T14:00:00.000Z' },
];

const DashboardPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    // We will fetch meetings from our API later
    // and check for an active session.
    setMeetings(mockMeetings);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    // Logic to sign out with Supabase will go here
    console.log('Logging out...');
    // navigate('/login');
  };

  if (loading) {
    return <DashboardContainer><p>Loading dashboard...</p></DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      <Title>Scheduled Meetings</Title>
      <MeetingsTable>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Meeting Time</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.client_name}</td>
              <td>{meeting.client_email}</td>
              <td>{new Date(meeting.meeting_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </MeetingsTable>
    </DashboardContainer>
  );
};

export default DashboardPage; 