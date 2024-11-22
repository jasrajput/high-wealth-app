require('dotenv').config(); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

const generateToken = (user) => {
  const payload = { userId: user._id };
  const expiresIn = 24 * 60 * 60; // 1 day
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  
  return { token, expiresIn };
};


module.exports = { generateToken, verifyToken };
