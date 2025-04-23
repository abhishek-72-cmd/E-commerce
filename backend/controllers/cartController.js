const express = require ('express');
const Cart = require ('../models/cartSchema')
// Add item to cart

const mongoose = require('mongoose');
const addToCart = async (req, res) => {
  try {
    console.log("Received Payload at Backend:", req.body); 
    const { userId, productId, title, price, quantity = 1, image, description, category } = req.body;

    if (!userId || !productId || !title || !price || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const objectUserId = new mongoose.Types.ObjectId(userId);
    const numericPrice = parseFloat(price);
    const numericQuantity = parseInt(quantity);

    if (isNaN(numericPrice) || isNaN(numericQuantity)) {
      return res.status(400).json({ error: 'Invalid price or quantity' });
    }

    let cart = await Cart.findOne({ userId: objectUserId });

    if (!cart) {
      cart = new Cart({
        userId: objectUserId,
        products: [{
          productId,
          title,
          price: numericPrice,
          quantity: numericQuantity,
          image,
          description,
          category
        }],
        total: numericPrice * numericQuantity
      });
    } else {
      const existingProduct = cart.products.find(item => item.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += numericQuantity;
      } else {
        cart.products.push({
          productId,
          title,
          price: numericPrice,
          quantity: numericQuantity,
          image,
          description,
          category
        });
      }

      cart.total = cart.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    const savedCart = await cart.save();
    res.status(201).json({ 
      success: true,
      message: 'Item added to cart',
      cart: savedCart 
    });

  } catch (err) {
    console.error('Add to cart error:', err.stack);
    res.status(500).json({ 
      success: false,
      error: 'Failed to add to cart',
      details: err.message 
    });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch cart', details: err.message });
    }
  };



// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body; // 👈 updated from params

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Filter out the product
    cart.products = cart.products.filter(item => item.productId !== productId);

    // Recalculate total
    cart.total = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item', details: err.message });
  }
};

// Update item quantity // POST /api/cart/updateQuantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const product = cart.products.find(item => item.productId === productId);
    if (!product) return res.status(404).json({ message: 'Product not found in cart' });

    if (action === 'increment') {
      product.quantity += 1;
    } else if (action === 'decrement' && product.quantity > 1) {
      product.quantity -= 1;
    }

    // Recalculate total
    cart.total = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update quantity', details: err.message });
  }
};

  const FindtItem = async  (req,res)=>{

    try{

const item = Cart.findOne({userId: req.params.userId})
if(!Cart){
    return res.status(404).json({ message: 'Cart not found' });
}
res.json(Cart);
    } catch (err){
res.status (401).json({message: `unabel to find item ${err}`})
    }
     
  } 
  module.exports = {
    addToCart,
    getUserCart,
    removeFromCart,
    updateCartItemQuantity,
    FindtItem
  };