import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

export const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLoginAsGuest = () => {
    setLoggingIn(true);
    // Simulate API call
    setTimeout(() => {
      login();
      setLoggingIn(false);
      navigate('/checkout');
    }, 1000);
  };

  // If already authenticated, redirect to checkout
  if (isAuthenticated) {
    navigate('/checkout');
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>Welcome to ShopZone</h1>
          <p>Please log in to continue with your purchase</p>

          <div className="login-options">
            <button
              onClick={handleLoginAsGuest}
              disabled={loggingIn}
              className="btn-guest-login"
            >
              {loggingIn ? 'Logging in...' : '👤 Login as Guest'}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="btn-other-login">
              Continue with Email
            </button>

            <button className="btn-other-login">
              Continue with Google
            </button>
          </div>

          <div className="login-info">
            <h3>Guest Checkout Benefits</h3>
            <ul>
              <li>✓ Quick and easy checkout process</li>
              <li>✓ No account creation required</li>
              <li>✓ Secure payment options</li>
              <li>✓ Order tracking available</li>
            </ul>
          </div>

          <p className="login-note">
            Your cart data and authentication status are securely stored in your
            browser's local storage.
          </p>
        </div>
      </div>
    </div>
  );
};
