// Import the required libraries
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from a .env file

// Function to create a token using a user object
const createToken = (user) =>
  jwt.sign(
    { 
      email: user.email, 
      id: user.id, 
      userRole: user.userRole 
    },
    process.env.SECRET_KEY,  // Use a strong secret key from environment
    { expiresIn: '1h' }      // Token will expire in 1 hour
  );

// Middleware function to verify an authentication token
const verifyToken = (req, res, next) => {
  // Get the authentication token from a cookie named "LegitUser"
  const token = req.cookies['LegitUser'];
  if (!token) {
    // If the token is not present in the request, return an error message
   return res.status(401).json({ error: 'Please register' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.authenticated = true; // Set a flag to indicate that the user is authenticated
    req.user = decoded;
    next(); // Call the next middleware function
  } catch (e) {
    // If the token is invalid, return an error message
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Export the functions for use in other modules
module.exports = { createToken, verifyToken };
