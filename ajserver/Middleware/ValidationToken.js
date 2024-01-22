// Middleware/ValidationToken.js

const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = validateToken;
