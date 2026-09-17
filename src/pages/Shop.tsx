import React, { FormEvent, useEffect, useState } from 'react';
import './Shop.css';

const SHOP_PASSWORD_HASH = '7b7e1fcbcec0d1732a3e51b4127ba0239878ae8deede7e20cb78a878d935c2ca';
const BUY_BUTTON_ID = 'buy_btn_1UFXmVEnwS9j9OFlY9Tfvuey';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SEXjZEnwS9j9OFlmyMdQKxz7rIHb47MxLJM18X1HnCZ8aOTeffdWGtwftm9rTE2za1uEELkbA5SVlC0zKosk5jn00xVRmDoos';

const hashPassword = async (password: string) => {
  const bytes = new TextEncoder().encode(password.trim());
  const digest = await crypto.subtle.digest('SHA-256', bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const Shop: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(
    () => sessionStorage.getItem('northstar-shop-access') === 'granted',
  );
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!hasAccess || document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);
  }, [hasAccess]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const submittedHash = await hashPassword(password);

      if (submittedHash !== SHOP_PASSWORD_HASH) {
        setError('Wrong password.');
        setPassword('');
        return;
      }

      sessionStorage.setItem('northstar-shop-access', 'granted');
      setHasAccess(true);
      setPassword('');
    } catch {
      setError('Wrong password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shop-page">
      <main className="shop-main">
        {hasAccess ? (
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
        ) : (
          <section className="shop-lock-card">
            <div className="shop-lock-icon" aria-hidden="true">✦</div>
            <p className="shop-eyebrow">Password protected</p>
            <h1 className="shop-lock-title">Your mug awaits you.</h1>

            <form className="shop-password-form" onSubmit={handleSubmit}>
              <label htmlFor="shop-password">Password</label>
              <input
                id="shop-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                autoFocus
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Checking…' : 'Enter shop'}
              </button>
            </form>

            {error && <p className="shop-error" role="alert">{error}</p>}
          </section>
        )}
      </main>
    </div>
  );
};

export default Shop;
