const isAuthenticated = require("./IsAuthenticatedController");
const prisma = require("../configs/PrismaClient")();
const cloudinary = require("../configs/cloudinary-config");
const upload = require("../configs/multer-config");

// Get the dashboard page if authenticated
exports.get_dashboard_page = [
  isAuthenticated,
  (req, res) => {
    res.render("dashboard", { title: "Dashboard", user: req.user });
  },
];

// Post to insert name in the dashboard
exports.post_dashboard_name_insert = [
  isAuthenticated,
  async (req, res) => {
    const id = req.user.id;
    const { name } = req.body;
    if (!name) {
      return res.render("dashboard", { title: "Dashboard", user: req.user });
    }
    await prisma.user.update({
      where: {
        id: id,
      },
      data: { name: name },
    });
    res.render("index", { title: "Dashboard", user: req.user });
  },
];
