const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


// Function to generate JWT token for a user
dotenv.config();
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: '1h' 
        }
    );
};

module.exports = generateToken;

//this file defines a function to generate a JWT token for a user. It takes the user object as input and creates a token that includes the user's ID and role. The token is signed using a secret key from the environment variables and has an expiration time of 1 hour. The generated token is then returned for use in authentication processes.