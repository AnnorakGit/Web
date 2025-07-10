import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndFetchMeetings = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      
      setUser(session.user);

      try {
        // Fetch the meetings from our secure API endpoint
        const response = await fetch('/api/get-all-meetings', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token might be expired or invalid, sign out and redirect
            await supabase.auth.signOut();
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch meetings.');
        }

        const data = await response.json();
        setMeetings(data);

      } catch (error) {
        console.error('Error fetching meetings:', error);
        // Handle error state for the user
      } finally {
        setLoading(false);
      }
    };

    checkUserAndFetchMeetings();
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    }
    // The user will be redirected by the effect hook on the next render,
    // or we can navigate manually.
    navigate('/login');
  };

  if (loading) {
    return <DashboardContainer><p>Loading dashboard...</p></DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      <Title>Welcome, {user?.email}</Title>
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