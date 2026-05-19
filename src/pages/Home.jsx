import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopZone</h1>
          <p>Your one-stop destination for premium products</p>
          <Link to="/shop" className="cta-button">
            Start Shopping
          </Link>
        </div>
      </div>

      <section className="features">
        <h2>Why Choose ShopZone?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🛒 Wide Selection</h3>
            <p>Browse our extensive catalog of quality products</p>
          </div>
          <div className="feature-card">
            <h3>💳 Easy Checkout</h3>
            <p>Secure and hassle-free shopping experience</p>
          </div>
          <div className="feature-card">
            <h3>🚚 Fast Delivery</h3>
            <p>Quick and reliable shipping to your doorstep</p>
          </div>
          <div className="feature-card">
            <h3>💬 Customer Support</h3>
            <p>24/7 support for all your questions</p>
          </div>
        </div>
      </section>
    </div>
  );
};
