import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/waterfall.css';
import BackgroundEffects from './components/BackgroundEffects';
import Header from './components/Header';
import Hero from './components/Hero';
import Crisis from './components/Crisis';
import Intervention from './components/Intervention';
import Impact from './components/Impact';
import AboutUs from './components/AboutUs';
import Future from './components/Future';
import Donate from './components/Donate';
import Footer from './components/Footer';
import useScrollObserver from './hooks/useScrollObserver';

const App = () => {
  const [funding, setFunding] = useState(0);
  const [donors, setDonors] = useState(0);
  const goal = 50000;

  // Initialize scroll observer
  useScrollObserver();

  // Simulate initial funding and donors
  useEffect(() => {
    const initialFunding = 12500;
    const initialDonors = 47;
    setFunding(initialFunding);
    setDonors(initialDonors);
  }, []);

  // Simulate periodic donations
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 100) + 10;
      setFunding(prev => Math.min(prev + randomAmount, goal));
      setDonors(prev => prev + 1);
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, [goal]);

  const handleDonation = (amount) => {
    setFunding(prev => Math.min(prev + amount, goal));
    setDonors(prev => prev + 1);
  };

  const handleShowDonationDetails = () => {
    // Scroll to donate section
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Background Effects - Always rendered first for z-index layering */}
      <BackgroundEffects />
      
      {/* Toast Notification */}
      <div id="toast" className="toast" role="alert" aria-live="polite"></div>
      
      {/* Header Navigation */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Components can be reordered here without breaking functionality */}
        <Hero 
          funding={funding} 
          goal={goal} 
          donors={donors}
          onShowDonationDetails={handleShowDonationDetails}
        />
        <Donate onDonation={handleDonation} />
        <Crisis />
        <Intervention />
        <Impact />
        <AboutUs />
        <Future />
        
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Donate Button 
      <button 
        className="floating-donate" 
        onClick={() => {
          const donateSection = document.getElementById('donate');
          if (donateSection) {
            donateSection.scrollIntoView({ behavior: 'smooth' });
          }
        }} 
        aria-label="Scroll to donate section"
      >
        <i className="fa-solid fa-droplet"></i>
      </button>*/}
    </div>
  );
};

export default App;
