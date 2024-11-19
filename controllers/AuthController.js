// const { validationResult } = require("express-validator");
// const { signUpValidation } = require("../validations/validation");
const bcrypt = require("bcryptjs");
const prisma = require("../configs/PrismaClient");
const passport = require("../configs/passport");

// GET sign_up page
exports.get_sign_up_form = (req, res) => {
  res.render("signup", { title: "Create your account", errors: [] });
};

// POST sign up page
exports.post_sign_up_form = [
  async (req, res) => {
    const { username, password } = req.body;
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.render("signup", {
        title: "Create your account",
        errors: results.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      return res.redirect("/");
    } catch (error) {
      return res.render("signup", {
        title: "Create your account",
        errors: [{ msg: "An error occurred, please try again later" }],
      });
    }
  },
];

// GET sign-in-form
exports.get_sign_in_form = (req, res) => {
  res.render("login", { title: "Login", errors: [] });
};

// POST sign-in-form
exports.post_sign_in_form = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

// GET log-out
exports.get_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect("/");
};
