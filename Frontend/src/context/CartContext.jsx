// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cachedProducts, setCachedProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!cachedProducts.length) {
      axios.get("https://api.escuelajs.co/api/v1/products").then((res) => {
        setCachedProducts(res.data);
        localStorage.setItem("products", JSON.stringify(res.data));
      });
    }
  }, []);

  const fetchCartItems = async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.products || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };
  const addToCart = async (product) => {
    try {
      // Validate all required fields
      if (!userId || !token || !product?.id || !product?.title || !product?.price || !product?.images?.[0]) {
        throw new Error('Missing required fields for adding to cart');
      }
  
      const payload = {
        userId,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.images[0],
        description: product.description || 'No description',
        category: product.category?.name || 'General'
      };
  
      const res = await axios.post(
       `${process.env.REACT_APP_API_BASE_URL}/cart/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (res.data.success) {
        fetchCartItems(); // Refresh cart items
        return { success: true, data: res.data };
      } else {
        throw new Error(res.data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
      throw err; // Re-throw to handle in component
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, addToCart, cachedProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
