// Imports below

// Imports above

exports.get_home_page = async (req, res) => {
  res.render("index", { title: "Home", user: req.user });
};
