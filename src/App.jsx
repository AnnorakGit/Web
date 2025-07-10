import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MessagesDashboardPage from './pages/MessagesDashboardPage'; // Import the new page
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundVideo from './components/BackgroundVideo';

function AppContent() {
  const location = useLocation();
  const showGlobalBackground = !location.pathname.startsWith('/admin');

  return (
    <>
      {showGlobalBackground && <BackgroundVideo />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/messages" element={<MessagesDashboardPage />} /> {/* Add the new route */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}


function App() {
  // The react-router-dom 'BrowserRouter' is already in main.jsx
  // We just need a placeholder for the content that uses router hooks
  return <AppContent />;
}

export default App;
