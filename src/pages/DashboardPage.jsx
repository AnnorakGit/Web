import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const WelcomeMessage = styled.h1`
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 2.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
`;

// Styles for react-datepicker
const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: auto;
  }
  .react-datepicker__input-container input {
    padding: 0.75rem;
    background-color: #1a1a1f;
    border: 1px solid #333;
    border-radius: 8px;
    color: #EFEFEF;
    font-family: 'Satoshi-Regular', sans-serif;
    font-size: 1rem;
    width: 150px;
  }
`;


// Mock data until we connect the API
const mockMeetings = [
  { id: 1, client_name: 'John Doe', client_email: 'john@example.com', meeting_time: '2024-08-15T10:00:00.000Z' },
  { id: 2, client_name: 'Jane Smith', client_email: 'jane@example.com', meeting_time: '2024-08-15T14:00:00.000Z' },
];

const DashboardPage = () => {
  const [allMeetings, setAllMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If auth is still loading, do nothing.
    if (authLoading) return;
    
    // If auth has loaded and there's no user, redirect.
    if (!user) {
      navigate('/login');
      return;
    }

    // If we have a user, fetch their meetings.
    const fetchMeetings = async () => {
      setLoadingMeetings(true);
      try {
        const response = await fetch('/api/get-all-meetings', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch meetings.');

        const data = await response.json();
        setAllMeetings(data); // Set allMeetings
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoadingMeetings(false);
      }
    };
    
    fetchMeetings();
  }, [user, session, authLoading, navigate]);

  useEffect(() => {
    let filtered = allMeetings;

    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.client_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter(m => new Date(m.meeting_time) >= startDate);
    }
    
    if (endDate) {
      // Add 1 day to endDate to make the filter inclusive
      const inclusiveEndDate = new Date(endDate);
      inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
      filtered = filtered.filter(m => new Date(m.meeting_time) < inclusiveEndDate);
    }
    
    setFilteredMeetings(filtered);

  }, [searchTerm, startDate, endDate, allMeetings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); // Navigate immediately after sign out
  };

  if (authLoading) {
    return <DashboardContainer><p>Initializing...</p></DashboardContainer>;
  }
  
  return (
    <DashboardContainer>
      <HeaderRow>
        <WelcomeMessage>Welcome, {user?.email}</WelcomeMessage>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </HeaderRow>

      <FilterContainer>
        <SearchInput 
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DatePickerWrapper>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start date"
            isClearable
          />
        </DatePickerWrapper>
        <DatePickerWrapper>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End date"
            isClearable
          />
        </DatePickerWrapper>
      </FilterContainer>
      
      {loadingMeetings ? (
        <p>Loading meetings...</p>
      ) : filteredMeetings.length === 0 ? (
        <p>No meetings match the current filters.</p>
      ) : (
        <MeetingsTable>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map((meeting) => (
              <tr key={meeting.id}>
                <td>{meeting.client_name}</td>
                <td>{meeting.client_email}</td>
                <td>{format(new Date(meeting.meeting_time), 'PPP')}</td>
                <td>{format(new Date(meeting.meeting_time), 'p')}</td>
              </tr>
            ))}
          </tbody>
        </MeetingsTable>
      )}
    </DashboardContainer>
  );
};

export default DashboardPage; 