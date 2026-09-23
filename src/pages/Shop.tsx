import React, { useEffect } from 'react';
import './Shop.css';

const BUY_BUTTON_ID = 'buy_btn_1UFXmVEnwS9j9OFlY9Tfvuey';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SEXjZEnwS9j9OFlmyMdQKxz7rIHb47MxLJM18X1HnCZ8aOTeffdWGtwftm9rTE2za1uEELkbA5SVlC0zKosk5jn00xVRmDoos';

const Shop: React.FC = () => {
  useEffect(() => {
    if (document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="shop-page">
      <main className="shop-main">
        <section className="shop-content">
          <p className="shop-eyebrow">Northstar Politics</p>
          <h1 className="shop-title">Shop</h1>
          <p className="shop-intro">Take a little piece of northstar with you.</p>

          <div className="stripe-product">
            <stripe-buy-button
              buy-button-id={BUY_BUTTON_ID}
              publishable-key={STRIPE_PUBLISHABLE_KEY}
            >
            </stripe-buy-button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Shop;
