const bcrypt = require("bcryptjs");
const prisma = require("../configs/PrismaClient")();
const passport = require("../configs/passport");

// GET sign-up page
exports.get_sign_up_form = (req, res) => {
  res.render("signup", {
    title: "Create your account",
    errors: [],
  });
};

// POST sign-up page
exports.post_sign_up_form = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.render("signup", {
        title: "Create your account",
        errors: [{ msg: "Username already exists" }],
      });
    }

    // Hash password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Redirect to the login page after successful sign-up
    return res.redirect("/login");
  } catch (error) {
    console.error("Sign-up error:", error);
    return res.render("signup", {
      title: "Create your account",
      errors: [{ msg: "An error occurred, please try again later" }],
    });
  }
};

// GET sign-in page
exports.get_sign_in_form = (req, res) => {
  res.render("login", {
    title: "Login",
    errors: [],
  });
};

// POST sign-in page
exports.post_sign_in_form = passport.authenticate("local", {
  successRedirect: "/", // Redirect to home on successful login
  failureRedirect: "/login", // Redirect to login page on failure
  // Enable flash messages (requires flash middleware)
});

// GET log-out
exports.get_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Pass errors to the error middleware
    }
    res.redirect("/"); // Redirect to home after logout
  });
};
