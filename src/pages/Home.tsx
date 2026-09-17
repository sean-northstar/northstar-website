import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

const slideImages = [
  { src: '/images/noah and sean.png', alt: 'Noah and Sean recording the Northstar podcast' },
  { src: '/images/union debate.jpg', alt: 'Northstar union debate' },
  { src: '/images/sean union.jpg', alt: 'Sean speaking at a union debate' },
  { src: '/images/noah union.jpg', alt: 'Noah speaking at a union debate' },
  { src: '/images/sean connie.png', alt: 'Sean recording a conversation' },
  { src: '/images/group hike.jpg', alt: 'Northstar community group hike' },
  { src: '/images/noah charlie.png', alt: 'Noah recording a conversation' },
];

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  const handleButtonClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isSlideshowPaused) return;

    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isSlideshowPaused]);

  // Slow-moving constellation background
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

    class Star {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseOpacity: number;
      twinklePhase: number;
      twinkleSpeed: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
        this.size = Math.random() * 1.4 + 0.7;
        this.baseOpacity = Math.random() * 0.3 + 0.22;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.008 + 0.003;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.twinklePhase += this.twinkleSpeed;

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
        const opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.12;

        ctx.save();
        ctx.globalAlpha = Math.max(0.12, opacity);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
        ctx.shadowBlur = this.size * 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const stars: Star[] = [];
    const starCount = window.innerWidth < 768 ? 34 : 58;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const drawConnections = () => {
      const connectionDistance = window.innerWidth < 768 ? 105 : 145;

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.13;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => star.update());
      drawConnections();
      stars.forEach(star => {
        star.draw();
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
          <section className="hero">
            <div className="hero-copy">
              <h1 className="main-heading">
                Pushing political <strong><em>imagination.</em></strong>
              </h1>
              <p className="hero-description">
                We're on a mission to help people think about politics differently. From our weekly podcast to debates and documentaries our politics is fixated on community building, justice and principled action.
              </p>
              <div className="decorative-line"></div>
            </div>

            <div
              className="hero-slideshow"
              onMouseEnter={() => setIsSlideshowPaused(true)}
              onMouseLeave={() => setIsSlideshowPaused(false)}
            >
              <div
                className="hero-slideshow-wrapper"
                role="region"
                aria-roledescription="carousel"
                aria-label="Northstar photos"
              >
                {slideImages.map((slide, index) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={`hero-slideshow-image ${slide.src.includes('sean union') ? 'sean-union-position' : ''} ${index === currentSlide ? 'active' : ''}`}
                  />
                ))}

                <button className="hero-slide-arrow hero-slide-prev" onClick={prevSlide} aria-label="Previous photo">
                  ‹
                </button>
                <button className="hero-slide-arrow hero-slide-next" onClick={nextSlide} aria-label="Next photo">
                  ›
                </button>

                <div className="hero-slide-dots">
                  {slideImages.map((slide, index) => (
                    <button
                      key={slide.src}
                      className={`hero-slide-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="home-cta">
            <p className="cta-text">View our content below</p>

            <div className="buttons-container">
              <button
                className="social-button youtube"
                onClick={() => handleButtonClick('https://www.youtube.com/@northstarshow')}
              >
                <img src="/images/YouTube.png" alt="YouTube" className="social-icon" />
                YouTube
              </button>
              <button
                className="social-button spotify"
                onClick={() => handleButtonClick('https://open.spotify.com/show/097nREvXwxla1yY91ZizSB')}
              >
                <img src="/images/Spotfiy.png" alt="Spotify" className="social-icon" />
                Spotify
              </button>
              <button
                className="social-button apple-podcasts"
                onClick={() => handleButtonClick('https://podcasts.apple.com/podcast/northstar-politics-show/id1848382459')}
              >
                <img src="/images/apple-logo-white.png" alt="Apple" className="social-icon" />
                Apple
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
        </div>
      </main>
    </div>
  );
};

export default Home;
