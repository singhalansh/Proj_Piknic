import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Experience from './components/Experience';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Membership from './components/Membership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingButton from './components/BookingButton';
import LoadingScreen from './components/LoadingScreen';
import OurStoryPage from './pages/OurStoryPage';
import OurCourtsPage from './pages/OurCourtsPage';
import CafePage from './pages/CafePage';
import OurTalesPage from './pages/OurTalesPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-cream-50">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <OurStory />
                <Experience />
                <Events />
                <Gallery />
                <Membership />
                <Contact />
              </main>
              <Footer />
              <BookingButton />
            </>
          } />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/our-courts" element={<OurCourtsPage />} />
          <Route path="/cafe" element={<CafePage />} />
          <Route path="/our-tales" element={<OurTalesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;