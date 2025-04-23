const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { collection: 'users' }
  );

  const User = mongoose.model('User', userSchema);
  module.exports = User;