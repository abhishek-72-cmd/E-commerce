const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables BEFORE using them
dotenv.config(); 

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  console.log("Connecting to MongoDB with URI:", MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // optional: exit process if connection fails
  }
};

module.exports = connectDB;
