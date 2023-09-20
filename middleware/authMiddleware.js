require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.header('Authorization')

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Login required' })
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.jwtSecret)

    req.user = decoded

    next()
  } catch (error) {
    // Token verification failed
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = authenticateToken
