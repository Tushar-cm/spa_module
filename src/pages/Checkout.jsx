import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Checkout.css';

export const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="checkout">
        <div className="empty-cart-message">
          <h1>Your cart is empty</h1>
          <p>Please add items to your cart before checking out.</p>
          <button onClick={() => navigate('/shop')} className="btn-back-shop">
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    console.log('Order placed:', formData);
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      logout();
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="checkout">
        <div className="order-confirmation">
          <div className="confirmation-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <p className="order-number">
            Order ID: #SZ{Math.floor(Math.random() * 1000000)}
          </p>
          <p className="redirect-message">
            Redirecting you to home page...
          </p>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="checkout">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your purchase</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <fieldset>
              <legend>Shipping Information</legend>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Payment Information</legend>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardExpiry">Expiry Date *</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardCVV">CVV *</label>
                  <input
                    type="text"
                    id="cardCVV"
                    name="cardCVV"
                    placeholder="123"
                    value={formData.cardCVV}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn-place-order">
              Place Order
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <span>{item.title}</span>
                  <span className="item-qty">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="summary-row">
            <span>Tax:</span>
            <span>${(parseFloat(total) * 0.08).toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total:</span>
            <span>${(parseFloat(total) * 1.08).toFixed(2)}</span>
          </div>

          <p className="payment-methods">
            We accept: Visa, Mastercard, American Express
          </p>
        </div>
      </div>
    </div>
  );
};
