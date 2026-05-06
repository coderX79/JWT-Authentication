const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token',
            });
        }
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed',
        });
    }
};

module.exports = { protect }

//this code defines an authentication middleware function called "protect". It checks for the presence of a JWT token in the Authorization header of the incoming request. If a token is found, it verifies the token using the secret key and decodes it to extract the user information. The decoded user information is then attached to the request object for use in subsequent middleware or route handlers. If no token is found or if the token verification fails, it sends a 401 Unauthorized response with an appropriate message. The protect function is exported for use in other parts of the application.