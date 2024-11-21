const isAuthenticated = require("./IsAuthenticatedController");
const prisma = require("../configs/PrismaClient")();
const cloudinary = require("../configs/cloudinary-config");
const upload = require("../configs/multer-config");

// Get the dashboard page if authenticated
exports.get_dashboard_page = [
  isAuthenticated,
  async (req, res) => {
    const id = req.user.id;
    try {
      const folders = await prisma.folder.findMany({
        where: {
          userId: id,
        },
      });
      res.render("dashboard", { title: "Dashboard", user: req.user, folders });
    } catch (error) {
      res.json({ msg: "Error while fetching requested data" });
      console.error(error.message);
    }
  },
];

// Post to insert name in the dashboard
exports.post_dashboard_name_insert = [
  isAuthenticated,
  async (req, res) => {
    const id = req.user.id;
    const { name } = req.body;
    try {
      const folders = await prisma.folder.findMany({
        where: {
          userId: id,
        },
      });
      if (!name && name === "") {
        return res.render("dashboard", {
          title: "Dashboard",
          user: req.user,
          folders,
        });
      }
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
      res.render("/dashboard", { title: "Dashboard", user: req.user, folders });
    } catch (error) {
      res.json({ msg: "Error occur while fetching data" });
      console.error(error.message);
    }
  },
];
