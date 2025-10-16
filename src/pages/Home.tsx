import React, { useEffect, useRef } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const handleButtonClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        
        // Random colors with red theme
        const colors = [
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 182, 193, 0.6)',
          'rgba(255, 192, 203, 0.5)',
          'rgba(255, 160, 122, 0.4)',
          'rgba(255, 218, 185, 0.3)',
          'rgba(255, 228, 196, 0.2)'
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Fade out over time
        this.opacity = Math.max(0, this.opacity - 0.001);

        // Reset particle when it dies
        if (this.life > this.maxLife || this.opacity <= 0) {
          this.x = Math.random() * (canvas?.width || window.innerWidth);
          this.y = Math.random() * (canvas?.height || window.innerHeight);
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.opacity = Math.random() * 0.6 + 0.2;
          this.life = 0;
          this.maxLife = Math.random() * 300 + 200;
        }

        // Wrap around edges
        const canvasWidth = canvas?.width || window.innerWidth;
        const canvasHeight = canvas?.height || window.innerHeight;
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="home-page">
      <canvas 
        ref={canvasRef} 
        className="particle-canvas"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
      />
      <main className="main-content">
        <div className="content-wrapper">
          {/* Main Heading */}
          <h1 className="main-heading">
            Pushing political <strong><em>imagination.</em></strong>
          </h1>
          
          {/* Decorative Line */}
          <div className="decorative-line"></div>
          
          {/* Sub-text */}
          <p className="sub-text">
            A new political platform that dares to <em>dream.</em>
          </p>
          
          {/* Compass Icon */}
          <div className="compass-icon-large">
            <img src="/images/white-logo-no-background.svg" alt="Compass" className="compass-svg" />
          </div>
          
          {/* Call to Action */}
          <p className="cta-text">View our content below</p>
          
          {/* Social Media Buttons */}
          <div className="buttons-container">
            <button 
              className="social-button youtube"
              onClick={() => handleButtonClick('https://www.youtube.com/@northstarshow')}
            >
              <img src="/images/YouTube.png" alt="YouTube" className="social-icon" />
              YouTube
            </button>
            <button 
              className="social-button substack"
              onClick={() => handleButtonClick('https://substack.com/@northstarpolitics')}
            >
              <img src="/images/substack.png" alt="Substack" className="social-icon" />
              Substack
            </button>
            <button 
              className="social-button instagram"
              onClick={() => handleButtonClick('https://www.instagram.com/northstarpolitics/')}
            >
              <img src="/images/instagram.png" alt="Instagram" className="social-icon" />
              Instagram
            </button>
            <button 
              className="social-button tiktok"
              onClick={() => handleButtonClick('https://tiktok.com/@northstarpolitics_')}
            >
              <img src="/images/tiktok.png" alt="TikTok" className="social-icon" />
              TikTok
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
