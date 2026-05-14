import React, { useState } from 'react';
import '../styleCompants/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    // Added 'w-full' and ensured padding 'px-6' handles the breathing room on the edges
    <nav className="fixed top-0 left-0 w-full z-50 px-20 py-4" style={{ background: 'linear-gradient(to bottom, rgba(8,8,6,0.85), transparent)' }}>
      {/* CHANGE 1: Removed 'max-w-6xl mx-auto' to allow the content to hit the left/right edges.
          CHANGE 2: Kept 'justify-between' so the logo stays left and the nav links stay right.
      */}
      <div className="w-full flex items-center justify-between">
        
        {/* This anchor tag contains your logo and name, now pinned to the left edge of the padding */}
        <a href="#" className="flex items-center gap-2 text-white no-underline" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <img 
            src="relieveLankalogo.png" 
            alt="Relieve Lanka Logo" 
            className="h-16 w-16 md:h-18 md:w-18 object-contain" // Adjusted size for better fit in header
          />
          <span className="font-display text-xl tracking-tight uppercase">Relieve Lanka</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#crisis" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('crisis'); }}>Crisis</a>
          <a href="#intervention" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('intervention'); }}>Relief</a>
          <a href="#impact" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('impact'); }}>Impact</a>
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }}>About</a>
          <a href="#donate" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('donate'); }}>Donate</a>
        </div>
        
        <button 
          className="md:hidden text-white text-xl" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile Menu remains centered for better UX */}
      <div 
        id="mobileMenu" 
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden mt-4 pb-4 flex-col gap-4 items-center`}
      >
        <a href="#crisis" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('crisis'); }}>Crisis</a>
        <a href="#intervention" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('intervention'); }}>Relief</a>
        <a href="#impact" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('impact'); }}>Impact</a>
        <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }}>About</a>
        <a href="#donate" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('donate'); }}>Donate</a>
      </div>
    </nav>
  );
};

export default Header;