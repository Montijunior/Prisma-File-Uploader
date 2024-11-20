// Middleware to check if a user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware or route
    return next();
  }
  // User is not authenticated, redirect to login page
  return res.redirect("/login");
}

module.exports = isAuthenticated;
