import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartItems(res.data.products || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, action) => {
    try {
      await axios.put('http://localhost:5000/api/cart/updateQuantity', {
        userId,
        productId,
        action,
      });
      fetchCartItems();
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };
  
  const handleRemoveItem = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/remove', {
        userId,
        productId,
      });
      fetchCartItems();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 cart-container">
        <h2 className="mb-4 text-center">🛒 Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="row">
              {cartItems.map((item) => (
                <div className="col-md-6 mb-4" key={item.productId}>
                  <div className="card h-100 shadow-sm">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded-start cart-img"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">Price: ₹{item.price}</p>
                          <div className="d-flex align-items-center mb-2">
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              onClick={() => handleQuantityChange(item.productId, 'decrement')}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm ms-2"
                              onClick={() => handleQuantityChange(item.productId, 'increment')}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveItem(item.productId)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-end mt-4">
              <h4>Total: ₹{totalPrice}</h4>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
