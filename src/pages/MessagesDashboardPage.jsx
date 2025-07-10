import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const DashboardContainer = styled.div`
  padding: 100px 5%;
  background-color: #0B0B0F;
  color: #EFEFEF;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 2.5rem;
`;

const MessagesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #333;
  }
  
  th {
    font-family: 'Satoshi-Bold', sans-serif;
  }

  tr.is_read {
    color: #888;
    font-style: italic;
  }
`;

const MessageContentCell = styled.td`
  max-width: 450px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #333;
  color: white;

  &:hover {
    background-color: #444;
  }
`;

const MessagesDashboardPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/get-contact-messages');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const response = await fetch('/api/update-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_read: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message status.');
      }

      const updatedMessage = await response.json();
      setMessages(messages.map(m => (m.id === id ? updatedMessage : m)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message permanently?')) {
      return;
    }

    try {
      const response = await fetch('/api/delete-message', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete the message.');
      }
      
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <DashboardContainer><Title>Loading Messages...</Title></DashboardContainer>;

  return (
    <DashboardContainer>
      <Header>
        <Title>Contact Messages</Title>
      </Header>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <MessagesTable>
        <thead>
          <tr>
            <th>Received</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className={msg.is_read ? 'is_read' : ''}>
              <td>{format(new Date(msg.created_at), 'Pp')}</td>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <MessageContentCell>{msg.message}</MessageContentCell>
              <td>{msg.is_read ? 'Read' : 'Unread'}</td>
              <td>
                <ActionButton onClick={() => handleToggleRead(msg.id, msg.is_read)}>
                  {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                </ActionButton>
                <ActionButton onClick={() => handleDelete(msg.id)}>Delete</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </MessagesTable>
    </DashboardContainer>
  );
};

export default MessagesDashboardPage; 