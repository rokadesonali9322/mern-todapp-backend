const express = require('express')
const router = express.Router()
const authController = require('../controller/authcontroller')
const authMiddleware = require('../middleware/authMiddleware')

// Register a new user
router.post('/register', authController.register)

// Login user
router.post('/login', authController.login)

// logout

router.post('/logout', authController.logout)
module.exports = router
