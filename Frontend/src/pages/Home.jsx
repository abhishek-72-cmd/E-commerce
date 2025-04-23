import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    
    const fetchProducts = async () => {
      try {
        const cachedProducts = localStorage.getItem('cachedProducts');
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
          setLoading(false);
        } else {
          const response = await axios.get('https://api.escuelajs.co/api/v1/products');
          setProducts(response.data);
          localStorage.setItem('cachedProducts', JSON.stringify(response.data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const handleAddToCart = async (product) => {
            try {
              await axios.post('http://localhost:5000/api/cart/add', {
                userId,
                productId: product.id.toString(),
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.images?.[0] || '',
                description: product.description,
                category: product.category?.name || 'Other'
              });
              alert('✅ Item added to cart!');
            } catch (err) {
              console.error('Add to cart error:', err.response?.data || err.message);
              alert('Failed to add item to cart.');
            }
          };
        
          useEffect(() => {
            fetchProducts();
          }, []);
        
          if (loading) {
            return (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            );
          }
    return (
      <>
        <Navbar />
        <div className="container py-4">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300'}
                    className="card-img-top"
                    alt={product.title}
                    loading="lazy"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="mt-auto">
                      <button 
                        className="btn btn-primary me-2" 
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        View Details
                      </button>
                      <button 
                        className="btn btn-success me-2" 
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button className="btn btn-warning">Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}

export default Home;

