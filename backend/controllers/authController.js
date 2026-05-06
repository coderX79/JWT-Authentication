const jwt = require("jsonwebtoken")
const User = require("../models/User")
const generateToken = require("../utils/generateToken")
const generateRefreshToken = require("../utils/generateRefreshToken")
// register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            role
        })

        await user.save()

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body


        // Validate user input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }

        // Find user by email and compare password
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Compare password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Generate JWT token
        const acessToken = generateToken(user)
        const refreshToken = generateRefreshToken(user)
        user.refreshToken = refreshToken
        await user.save()

        // Send response with token
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: acessToken,
            refreshToken: refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required"
            })
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.id)
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        // Generate new access token
        const newAccessToken = generateToken(user)

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: newAccessToken
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid refresh token",
            error: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required"
            })
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.id)
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        user.refreshToken = null
        await user.save()

        res.status(200).json({
            success: true,
            message: "Logout successful"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid refresh token",
            error: error.message
        })
    }
}


module.exports = { registerUser, loginUser, refreshToken, logoutUser }

//this code defines the authentication controller functions for user registration and login. The registerUser function checks if a user with the provided email already exists, creates a new user if not, and saves it to the database. The loginUser function validates the user's email and password, generates a JWT token if the credentials are correct, and sends a response with the token and user information. Both functions handle errors and send appropriate responses in case of failure.