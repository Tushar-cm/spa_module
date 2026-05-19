import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import './Shop.css';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <h1>Our Shop</h1>
        <p>Browse our wide selection of products</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card"
          >
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="price">${product.price}</span>
                <span className="rating">⭐ {product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
