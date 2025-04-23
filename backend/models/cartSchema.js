const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        description: String,
        category: String,
        quantity: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ],
    total: {
      type: Number,
      default: 0,
      min: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, {
    collection: 'carts' 
  });
  
  module.exports = mongoose.model('Carts', cartSchema);