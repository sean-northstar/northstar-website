import React from 'react';
import './App.css';

const App: React.FC = () => {
  const handleButtonClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="app">
      {/* Fixed Header with Home Icon */}
      <header className="header">
        <div className="header-container">
          <a href="/" className="home-link">
            <img src="/images/white text no background logo.svg" alt="Northstar Politics Home" className="home-icon" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Main Heading */}
          <h1 className="main-heading">
            Make the impossible, <strong><em>real.</em></strong>
          </h1>
          
          {/* Decorative Line */}
          <div className="decorative-line"></div>
          
          {/* Sub-text */}
          <p className="sub-text">
            We aim to push political imagination, in a time where our discourse is afraid to <em>dream.</em>
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
              YouTube
            </button>
            <button 
              className="social-button substack"
              onClick={() => handleButtonClick('https://substack.com/@northstarpolitics')}
            >
              Substack
            </button>
            <button 
              className="social-button instagram"
              onClick={() => handleButtonClick('https://www.instagram.com/northstarpolitics/')}
            >
              Instagram
            </button>
            <button 
              className="social-button tiktok"
              onClick={() => handleButtonClick('https://tiktok.com/@northstarpolitics_')}
            >
              TikTok
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          © 2025 Northstar Politics Ltd. All rights reserved. Reg No. <a href="https://find-and-update.company-information.service.gov.uk/company/15415602" target="_blank" rel="noopener noreferrer">15415602</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
