const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            //check if user role is in allowed roles
            if(!req.user){
                return res.status(401).json({
                    success: false,
                    message: "Not authorized, no user information"
                })
            }
            
            //check if user role is in allowed roles
            if(!allowedRoles.includes(req.user.role)){
                return res.status(403).json({
                    success: false,
                    message: "Forbidden, you do not have permission to access this resource"
                })
            }
            next();//allow access to the route
        } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
        }
    }
}

module.exports = { authorizeRoles }

//this code defines a middleware function called "authorizeRoles" that takes in a list of allowed roles as arguments. It checks if the user information is present in the request object and if the user's role is included in the allowed roles. If the user is not authenticated or does not have the required role, it sends an appropriate response with a 401 Unauthorized or 403 Forbidden status code. If the user has the necessary permissions, it calls the next middleware function to allow access to the route. The authorizeRoles function is exported for use in other parts of the application.