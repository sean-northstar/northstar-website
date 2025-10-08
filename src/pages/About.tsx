import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const About: React.FC = () => {
  const [selectedFounder, setSelectedFounder] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const handleFounderClick = (founder: string) => {
    setSelectedFounder(founder);
  };

  const handleCloseModal = () => {
    setSelectedFounder(null);
  };

  const handleSocialClick = (url: string) => {
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
    <div className="about-page">
      <canvas 
        ref={canvasRef} 
        className="particle-canvas"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
      />
      <main className="about-main">
        <div className="about-content">
          <h1 className="about-title">About Northstar</h1>
          
          {/* Mission Statement */}
          <div className="mission-section">
            <p className="mission-text">
              We started Northstar in 2024, when we wanted to help use our skills to hold politicians accountable for their decisions to support the genocide in Gaza. We worked across 4 different independent campaigns for MPs in London including the likes of Jeremy Corbyn. Like many, we're disillusioned with the status quo and so, through content we hope to push the limits of our political imagination and host conversations that inspire optimism and idealism.
            </p>
          </div>

          {/* Co-Founders Section */}
          <div className="founders-section">
            <h2 className="founders-title">Founders</h2>
            
            <div className="founders-grid">
              {/* Sean */}
              <div className="founder-card" onClick={() => handleFounderClick('sean')}>
                <div className="founder-image">
                  <img src="/images/Sean Headshot.jpeg" alt="Sean" className="founder-photo" />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">Sean</h3>
                  <p className="founder-role">Co-Founder</p>
                </div>
              </div>

              {/* Noah */}
              <div className="founder-card" onClick={() => handleFounderClick('noah')}>
                <div className="founder-image">
                  <img src="/images/Noah Headshot.jpeg" alt="Noah" className="founder-photo" />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">Noah</h3>
                  <p className="founder-role">Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedFounder && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            
            {selectedFounder === 'sean' && (
              <div className="founder-modal">
                <div className="modal-image">
                  <img src="/images/Sean Headshot.jpeg" alt="Sean" className="modal-photo" />
                </div>
                <div className="modal-info">
                  <h2 className="modal-name">Sean</h2>
                  <p className="modal-role">Co-Founder</p>
                  <div className="social-links">
                    <button 
                      className="social-link instagram"
                      onClick={() => handleSocialClick('https://instagram.com/seanramiz')}
                    >
                      <img src="/images/instagram.png" alt="Instagram" className="social-icon" />
                    </button>
                    <button 
                      className="social-link tiktok"
                      onClick={() => handleSocialClick('https://tiktok.com/@seanramiz')}
                    >
                      <img src="/images/tiktok.png" alt="TikTok" className="social-icon" />
                    </button>
                    <button 
                      className="social-link substack"
                      onClick={() => handleSocialClick('https://substack.com/@seanramiz')}
                    >
                      <img src="/images/substack.png" alt="Substack" className="social-icon" />
                    </button>
                  </div>
                  <p className="modal-about">
                    Sean was born and raised in North London. After graduating in PPE from Oxford he decided to pursue a career in TechForGood and now builds technology for charities and nonprofits. Alongside this he is a popular online content creator who reverted to Islam producing videos and essays on Politics, Philosophy and Religion.
                  </p>
                </div>
              </div>
            )}

            {selectedFounder === 'noah' && (
              <div className="founder-modal">
                <div className="modal-image">
                  <img src="/images/Noah Headshot.jpeg" alt="Noah" className="modal-photo" />
                </div>
                <div className="modal-info">
                  <h2 className="modal-name">Noah</h2>
                  <p className="modal-role">Co-Founder</p>
                  <div className="social-links">
                    <button 
                      className="social-link instagram"
                      onClick={() => handleSocialClick('https://instagram.com/noaheast9')}
                    >
                      <img src="/images/instagram.png" alt="Instagram" className="social-icon" />
                    </button>
                    <button 
                      className="social-link tiktok"
                      onClick={() => handleSocialClick('https://tiktok.com/@noaheast9')}
                    >
                      <img src="/images/tiktok.png" alt="TikTok" className="social-icon" />
                    </button>
                    <button 
                      className="social-link substack"
                      onClick={() => handleSocialClick('https://substack.com/@noaheast9')}
                    >
                      <img src="/images/substack.png" alt="Substack" className="social-icon" />
                    </button>
                  </div>
                  <p className="modal-about">
                    Noah was born and raised in East London. After graduating in PPE from Oxford he moved into banking for top tier firms and became quickly disillusioned. Since then he's travelled the world educating young people across different subjects. He is an avid writer with a special focus on ancient classics, philosophy, fiction and social commentary.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
