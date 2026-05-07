import React, { useEffect, useRef, useState } from 'react';
import '../styles/waterfall.css';
import mountImg from '../assets/mountain.png';
import '../styles/mountain.css';

let mountainX = 0

const BackgroundEffects = () => {
  const canvasRef = useRef(null);
  const atmosphereRef = useRef(null);
  const rippleFlashRef = useRef(null);
  const mountImgRef = useRef(new Image());
  const [themeClass, setThemeClass] = useState('mountain-default');


  useEffect(() => {
    mountImgRef.current.src = mountImg;

    const canvas = canvasRef.current;
    const atmosphere = atmosphereRef.current;
    const rippleFlash = rippleFlashRef.current;
    
    if (!canvas || !atmosphere || !rippleFlash) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    let fireflies = [];

    // Resize canvas
    const resizeCanvas = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    // Load mountain image

    mountImgRef.current.onload = () => {
      console.log("Mountain loaded!");
    };
    
    // Initialize fireflies
    const initFireflies = () => {
      fireflies = [];
      for (let i = 0; i < 20; i++) {
        fireflies.push({
          x: Math.random() * W,
          y: H * 0.3 + Math.random() * H * 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          glow: Math.random(),
          glowSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Draw firefly
    const drawFirefly = (firefly) => {
      ctx.save();
      const glowIntensity = Math.sin(firefly.glow) * 0.5 + 0.5;
      
      // Glow
      const gradient = ctx.createRadialGradient(firefly.x, firefly.y, 0, firefly.x, firefly.y, firefly.size * 4);
      gradient.addColorStop(0, `rgba(255, 255, 200, ${glowIntensity * 0.3})`);
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(firefly.x - firefly.size * 4, firefly.y - firefly.size * 4, firefly.size * 8, firefly.size * 8);
      
      // Core
      ctx.globalAlpha = glowIntensity;
      ctx.fillStyle = '#FFFFCC';
      ctx.beginPath();
      ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    // Update fireflies
    const updateFireflies = () => {
      fireflies.forEach(firefly => {
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;
        firefly.glow += firefly.glowSpeed;
        
        if (Math.random() < 0.01) {
          firefly.vx = (Math.random() - 0.5) * 0.3;
          firefly.vy = (Math.random() - 0.5) * 0.3;
        }
        
        if (firefly.x < 0) firefly.x = W;
        if (firefly.x > W) firefly.x = 0;
        if (firefly.y < 0) firefly.y = H;
        if (firefly.y > H) firefly.y = 0;
      });
    };

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, W, H);
      if (mountImgRef.current.complete) {
        const img = mountImgRef.current;
        // Maintain aspect ratio: height = width * (imgHeight / imgWidth)
        const aspect = img.height / img.width;
        const mWidth = W; 
        const mHeight = W * aspect;
    
      // Draw the image pinned to the bottom
      ctx.drawImage(img, mountainX, H - mHeight, mWidth, mHeight);
    
      // Subtle movement
      /* mountainX -= 0.05; */
    
      // Simple reset if it scrolls too far (or use a seamless loop)
      if (mountainX <= -W) mountainX = 0; 
    }
      // Draw fireflies
      fireflies.forEach(drawFirefly);
      
      // Update
      updateFireflies();
      
      requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    initFireflies();
    
    // Set initial funding state for animation
    setTimeout(() => {
      render();
    }, 500);

    // Event listeners
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        id="waterfallCanvas" 
        aria-hidden="true"
      />
      <div 
        ref={atmosphereRef}
        id="atmosphere" 
        aria-hidden="true"
      />
      <div 
        ref={rippleFlashRef}
        className="ripple-flash" 
        aria-hidden="true"
      />
      <canvas 
        ref={canvasRef}
        id="waterfallCanvas" 
        className={themeClass} 
        aria-hidden="true"
      />
    </>
  );
};

export default BackgroundEffects;
