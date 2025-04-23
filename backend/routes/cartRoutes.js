const express = require('express');
const router = express.Router();
const {addToCart, getUserCart, removeFromCart,  updateCartItemQuantity,FindtItem} = require('../controllers/cartController');
// const verifyJWT = require('../middleware/authmiddleware');



//  Add item to cart
router.post('/add', addToCart);

// Get cart items by user ID
router.get('/:userId', getUserCart);
    
// Remove item from cart by item ID
router.post('/remove', removeFromCart); //delte is not working


// Update item quantity in cart
router.put('/updateQuantity', updateCartItemQuantity);


router.get('/findItem/:userId', FindtItem);

module.exports = router;
