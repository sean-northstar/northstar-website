import React, { useEffect } from 'react';
import './Support.css';

const Support: React.FC = () => {
  useEffect(() => {
    // Load Stripe buy button script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="support-page">
      <main className="support-main">
        <div className="support-content">
          <h1 className="support-title">Support Northstar </h1>
          
          <p className="section-text" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            We're an independent duo doing this for the love of the game. Those who support our work early on will be added to a special chat where you can have say in shaping the future of our work and content!
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <stripe-buy-button
              buy-button-id="buy_btn_1SFyHVEnwS9j9OFloHPKkus5"
              publishable-key="pk_live_51SEXjZEnwS9j9OFlmyMdQKxz7rIHb47MxLJM18X1HnCZ8aOTeffdWGtwftm9rTE2za1uEELkbA5SVlC0zKosk5jn00xVRmDoos"
            >
            </stripe-buy-button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
