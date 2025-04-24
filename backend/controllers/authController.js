const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


// REGISTER USER
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Register request body:", req.body);
  
    try {
      const userExists = await User.findOne({ email });
  
      if (userExists) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong while registering' });
    }
  };
  
  // LOGIN USER
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
 
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      // Generate token 
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'defaultSecret',
        { expiresIn: '1d' }
      );

      // Return both token and user ID to the frontend
      res.status(200).json({ 
        message: 'Login successful', 
        token,
        userId: user._id 
      });
      
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed' });
    }
};
  

  // FORGOT PASSWORD
  const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
  
    } catch (err) {
      res.status(500).json({ error: 'Failed to reset password' });
    }
  };

  module.exports = {registerUser,loginUser,forgotPassword}