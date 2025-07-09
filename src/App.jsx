import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundVideo from './components/BackgroundVideo';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

const Layout = () => (
  <>
    <BackgroundVideo />
    <Header />
    <Outlet /> {/* This will render the matched route's component */}
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="book" element={<BookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
