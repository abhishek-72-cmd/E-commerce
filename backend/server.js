require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const authroutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://e-commerce-qf0ecbxgk-abhisheks-projects-40d7562c.vercel.app',
    'https://e-commerce-6benpq0d9-abhisheks-projects-40d7562c.vercel.app',
    'https://e-commerce-lilac-five-45.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authroutes);
app.use('/api/cart', cartRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
