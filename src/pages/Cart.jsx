import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <p>Start shopping to add items to your cart!</p>
          <Link to="/shop" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cart.length} item(s) in cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.thumbnail} alt={item.title} />
              </div>

              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-price">Price: ${item.price}</p>
                <p className="item-description">{item.description}</p>
              </div>

              <div className="item-quantity">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="qty-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="qty-input"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="item-total">
                <p className="total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="item-actions">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${total}</span>
          </div>

          <div className="summary-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="summary-item">
            <span>Tax:</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <Link to="/checkout" className="btn-checkout">
            Proceed to Checkout
          </Link>

          <Link to="/shop" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
