import React, { useState } from 'react';
import styled from 'styled-components';
// We will use supabase client later for authentication
// import { supabase } from '../supabaseClient';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0B0B0F;
  color: #EFEFEF;
  padding: 2rem;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  background-color: #1a1a1f;
  border: 1px solid #333;
  border-radius: 8px;
  color: #EFEFEF;
  font-family: 'Satoshi-Regular', sans-serif;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #6B7280;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-family: 'Satoshi-Bold', sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
  text-align: center;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Logic to sign in with Supabase will go here
    console.log('Logging in with:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
    setLoading(false);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>Admin Login</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage; 