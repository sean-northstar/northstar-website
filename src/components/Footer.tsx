import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-socials">
          <button 
            className="footer-social-icon"
            onClick={() => handleSocialClick('https://www.youtube.com/@northstarshow')}
            aria-label="YouTube"
          >
            <img src="/images/YouTube.png" alt="YouTube" />
          </button>
          <button 
            className="footer-social-icon"
            onClick={() => handleSocialClick('https://www.instagram.com/northstarpolitics/')}
            aria-label="Instagram"
          >
            <img src="/images/instagram.png" alt="Instagram" />
          </button>
          <button 
            className="footer-social-icon"
            onClick={() => handleSocialClick('https://tiktok.com/@northstarpolitics_')}
            aria-label="TikTok"
          >
            <img src="/images/tiktok.png" alt="TikTok" />
          </button>
          <button 
            className="footer-social-icon"
            onClick={() => handleSocialClick('https://substack.com/@northstarpolitics')}
            aria-label="Substack"
          >
            <img src="/images/substack.png" alt="Substack" />
          </button>
        </div>
        <div className="footer-copyright">
          © 2025 Northstar Politics Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
