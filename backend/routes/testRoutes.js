const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware")


// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Access granted",
    user: req.user,
  });
});


//Protected route to test authentication
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the admin-only route!"
    })
})

// admin + teacher route to test authentication
router.get("/teacher-content", protect, authorizeRoles("admin", "teacher"), (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the teacher-content route or admin access!"
    })
})

//all logged in users can access this route
router.get("/student", protect, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the student route! All logged in users can access this."
    })
})

module.exports = router;

//this code defines test routes to verify the authentication and role-based access control. It includes a protected route that requires authentication, an admin-only route, a route accessible to both admin and teacher roles, and a route accessible to all logged-in users. Each route returns a JSON response indicating the success of the request and relevant messages. The router is exported for use in the main application file.