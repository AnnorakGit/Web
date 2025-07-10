import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="book" element={<BookingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="admin/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
