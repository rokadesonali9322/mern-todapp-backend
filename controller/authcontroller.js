const User = require('../models/User')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check email already exists
    const exisitingEmail = await User.findOne({ email })
    if (exisitingEmail) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user with the hashed password
    const user = await User.create({ name, email, password: hashedPassword })

    res.json({ message: 'User registered successfully', user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body
    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ error: 'Password and confirmation password do not match' })
    }
    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    //    hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    //    sign a JWT token
    const token = JWT.sign({ userId: user._id }, process.env.jwtSecret, {
      expiresIn: '1h',
    })
    res.json({ token, message: 'Login successful' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Login failed' })
  }
}

//LOGOUT
exports.logout = async (req, res) => {
  res.clearCookie('refreshToken')
  return res.status(200).json({
    success: true,
    message: 'Logout Succesfully',
  })
}
