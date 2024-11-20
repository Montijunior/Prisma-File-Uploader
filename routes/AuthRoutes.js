const authController = require("../controllers/AuthController");
const { Router } = require("express");
const authRouter = Router();

// Route to display the signup form
authRouter.get("/signup", authController.get_sign_up_form);

// Route to handle signup form submission
authRouter.post("/signup", authController.post_sign_up_form);

// Route to display the login form
authRouter.get("/login", authController.get_sign_in_form);

// Route to handle login form submission
authRouter.post("/login", authController.post_sign_in_form);

// Route to handle user logout
authRouter.get("/logout", authController.get_logout);

module.exports = authRouter;
