require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const authroutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
