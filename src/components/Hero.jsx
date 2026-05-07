import React, { useState, useEffect, useRef } from 'react';
import '../styleCompants/Hero.css';
import "../styles/global.css"

const Hero = ({ funding = 0, goal = 50000, donors = 0, onShowDonationDetails }) => {
  const [fundPercent, setFundPercent] = useState(0);
  const [recentDonors, setRecentDonors] = useState([]);
  const progressRingRef = useRef(null);
  const milestoneMarkersRef = useRef(null);
  const ringParticlesRef = useRef(null);

  useEffect(() => {
    const percentage = Math.min((funding / goal) * 100, 100);
    setFundPercent(Math.round(percentage));
    updateProgressRing(percentage);
    updateMilestones(percentage);
  }, [funding, goal]);

  useEffect(() => {
    // Simulate recent donor feed
    const donorNames = ['Anonymous', 'Sarah K.', 'John D.', 'Maria L.', 'David R.', 'Emma S.'];
    const interval = setInterval(() => {
      const randomDonor = donorNames[Math.floor(Math.random() * donorNames.length)];
      setRecentDonors(prev => [...prev.slice(-2), randomDonor]);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  const updateProgressRing = (percentage) => {
    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 213.75;
      const offset = circumference - (percentage / 100) * circumference;
      progressRingRef.current.style.strokeDashoffset = offset;
    }
  };

  const updateMilestones = (percentage) => {
    if (milestoneMarkersRef.current) {
      const markers = milestoneMarkersRef.current.querySelectorAll('.milestone-marker');
      markers.forEach(marker => {
        const progress = parseFloat(marker.dataset.progress);
        if (percentage >= progress) {
          marker.classList.add('achieved');
        } else {
          marker.classList.remove('achieved');
        }
      });
    }
  };

  const createRingParticle = () => {
    if (ringParticlesRef.current) {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('cx', 270);
      particle.setAttribute('cy', 270);
      particle.setAttribute('r', 2);
      particle.classList.add('ring-particle');
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 213.75;
      const endX = 270 + Math.cos(angle) * distance;
      const endY = 270 + Math.sin(angle) * distance;
      
      particle.style.transition = 'all 2s ease-out';
      
      ringParticlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        particle.setAttribute('cx', endX);
        particle.setAttribute('cy', endY);
        particle.style.opacity = '0';
      }, 50);
      
      setTimeout(() => {
        if (ringParticlesRef.current.contains(particle)) {
          ringParticlesRef.current.removeChild(particle);
        }
      }, 2000);
    }
  };

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="flex items-center justify-center relative" style={{ minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Content */}
        <div className="text-left order-2 md:order-1">
          <h1 className="hero-title font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 animate-fade-in-up">
            Every Drop<br />
            <span style={{ color: 'var(--accent-bright)' }}>Restores a Forest</span>
          </h1>

          <p className="text-base md:text-lg max-w-lg mb-8 animate-fade-in-up delay-200" style={{ color: 'rgba(214,207,194,0.5)', lineHeight: '1.7' }}>
            Sri Lanka's flood-devastated communities are waiting. Your donation doesn't just fund relief — it transforms this ecosystem from crisis to recovery, right before your eyes.
          </p>

          <div className="mb-8 animate-fade-in-up delay-400">
            {/* Recent donor feed */}
            <div className="flex flex-wrap gap-2 mb-4" style={{ minHeight: '24px' }}>
              {recentDonors.map((donor, index) => (
                <div key={index} className="donor-feed-item">
                  <i className="fa-solid fa-heart text-xs mr-1"></i>
                  {donor}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up delay-600">
            <button 
              className="donate-cta" 
              onClick={() => smoothScrollTo('donate')} 
              aria-label="Begin donating"
            >
              Add to the Flow
              <i className="fa-solid fa-arrow-down ml-2 text-sm"></i>
            </button>
          </div>

          <div className="mt-12 animate-fade-in-up delay-800" style={{ color: 'rgba(214,207,194,0.15)' }}>
            <p className="text-xs uppercase tracking-widest mb-2">Scroll to follow the water</p>
            <i className="fa-solid fa-chevron-down text-sm" style={{ animation: 'bounce 2s infinite' }}></i>
          </div>
        </div>

        {/* Right Progress Ring */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="relative inline-block animate-fade-in-up">
            <svg width="500" height="500" viewBox="0 0 540 540" className="ring-breathing progress-ring-container" aria-label="Funding progress">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A9B6E"/>
                  <stop offset="50%" stopColor="var(--accent-bright"/>
                  <stop offset="100%" stopColor="#8FE4A6"/>
                </linearGradient>
                <linearGradient id="ringGradientDanger" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A84C"/>
                  <stop offset="100%" stopColor="#E6C75C"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Outer decorative rings */}
              <circle cx="270" cy="270" r="247.5" fill="none" strokeWidth="1" stroke="rgba(74,155,110,0.1)" strokeDasharray="5 10"/>
              <circle cx="270" cy="270" r="236.25" fill="none" strokeWidth="1" stroke="rgba(74,155,110,0.15)" strokeDasharray="3 7"/>
              
              {/* Background ring */}
              <circle cx="270" cy="270" r="213.75" fill="none" strokeWidth="18" className="progress-ring-bg"/>
              
              {/* Progress ring */}
              <circle 
                ref={progressRingRef}
                cx="270" cy="270" r="213.75" fill="none" strokeWidth="18"
                className="progress-ring-fill" strokeLinecap="round"
                strokeDasharray="1343.25" strokeDashoffset="1343.25"
                transform="rotate(-90 270 270)" filter="url(#glow)"
              />
              
              {/* Milestone markers */}
              <g ref={milestoneMarkersRef}>
                <circle cx="483.75" cy="270" r="6.75" fill="rgba(255,255,255,0.3)" className="milestone-marker" data-progress="25"/>
                <circle cx="270" cy="56.25" r="6.75" fill="rgba(255,255,255,0.3)" className="milestone-marker" data-progress="50"/>
                <circle cx="56.25" cy="270" r="6.75" fill="rgba(255,255,255,0.3)" className="milestone-marker" data-progress="75"/>
              </g>
              
              {/* Particle container */}
              <g ref={ringParticlesRef}></g>
            </svg>
            
            {/* Center content */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer" 
              onClick={onShowDonationDetails}
            >
              <span className="font-display text-5xl text-white transition-all duration-500">{fundPercent}%</span>
              <span className="text-sm mt-1 transition-all duration-500" style={{ color: 'rgba(214,207,194,0.4)' }}>of goal reached</span>
            </div>
            
            {/* Floating stat cards */}
            <div className="absolute -top-4 -right-4 stat-float-card">
              <div className="text-right">
                <span className="font-display text-xl text-white">${funding.toLocaleString()}</span>
                <p className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>raised</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 stat-float-card">
              <div className="text-left">
                <span className="font-display text-xl" style={{ color: 'rgba(214,207,194,0.5)' }}>${goal.toLocaleString()}</span>
                <p className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>goal</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 donor-indicator">
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-heart text-xs" style={{ color: 'var(--accent)' }}></i>
                <span className="text-xs font-medium">{donors}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
