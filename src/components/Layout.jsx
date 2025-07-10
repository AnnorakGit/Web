import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackgroundVideo from './BackgroundVideo';

const Layout = () => {
  const location = useLocation();
  const showBackgroundVideo = location.pathname === '/';

  return (
    <>
      {showBackgroundVideo && <BackgroundVideo />}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout; 