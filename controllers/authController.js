const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: req.body 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id },  'your_secret_key', {
      expiresIn: '1h'
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.toString()
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Find the user by email
    console.log('Signup request received:', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
      expiresIn: '1h'
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  // Implement your logout logic here, e.g., invalidate the token
  res.status(200).json({ message: 'Logged out successfully' });
};