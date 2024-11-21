const PrismaClient = require("../configs/PrismaClient");
const prisma = PrismaClient();
const isAuthenticated = require("./IsAuthenticatedController");
const upload = require("../configs/multer-config");
const cloudinary = require("../configs/cloudinary-config");

// Post request to create a new folder
exports.post_create_folder = [
  isAuthenticated,
  async (req, res) => {
    const id = req.user.id;
    const { folderName } = req.body;
    try {
      if (!folderName && folderName.trim() === "") {
        return res.json({ msg: "Your folder field is empty" });
      }
      await prisma.folder.create({
        data: {
          name: folderName,
          userId: id,
        },
      });
      console.log("OK! Folder created");
      res.redirect("/dashboard");
    } catch (error) {
      res.status(500).json({ msg: "Error occurred while creating folder" });
      console.error(error.message);
    }
  },
];
