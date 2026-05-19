import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { CartContext } from '../context/CartContext';
import './Product.css';

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => navigate('/shop')} className="btn-back">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="error">
          <p>Product not found.</p>
          <button onClick={() => navigate('/shop')} className="btn-back">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/shop')} className="btn-back">
        ← Back to Shop
      </button>

      <div className="product-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="thumbnail-images">
              {product.images.slice(0, 3).map((img, index) => (
                <img key={index} src={img} alt={`${product.title} ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        <div className="product-details">
          <h1>{product.title}</h1>

          <div className="rating-section">
            <span className="rating-stars">⭐ {product.rating}</span>
            <span className="stock-status">
              {product.stock > 0 ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </span>
          </div>

          <div className="price-section">
            <h2 className="price">${product.price}</h2>
            {product.discountPercentage && (
              <span className="discount">-{product.discountPercentage}%</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          <div className="product-details-info">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Stock Available:</strong> {product.stock}
            </p>
          </div>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="qty-input"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn-add-to-cart ${addedToCart ? 'success' : ''}`}
              disabled={product.stock === 0}
            >
              {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
          </div>

          {product.stock === 0 && (
            <p className="out-of-stock-message">
              This product is currently out of stock.
            </p>
          )}
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-grid">
            {product.reviews.slice(0, 3).map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <strong>{review.reviewerName}</strong>
                  <span className="review-rating">⭐ {review.rating}</span>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
