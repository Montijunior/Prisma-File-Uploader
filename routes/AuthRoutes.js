const authController = require("../controllers/AuthController");
const { Router } = require("express");
const authRouter = Router();

// GET signup form
authRouter.get("/signup", authController.get_sign_up_form);
// POST signup form
authRouter.post("/signup", authController.post_sign_up_form);

// GET sign in form
authRouter.get("/login", authController.get_sign_in_form);

// POST sign in
authRouter.post("/login", authController.post_sign_in_form);

// GET logout
authRouter.get("/logout", authController.get_logout);

module.exports = authRouter;
