const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshToken, logoutUser } = require('../controllers/authController');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to refresh access token
router.post('/refresh-token', refreshToken);

// Route to logout
router.post('/logout', logoutUser);

module.exports = router;

//this code defines the authentication routes for user registration and login. It imports the necessary controller functions and sets up POST routes for '/register' and '/login'. The router is then exported for use in the main application file.