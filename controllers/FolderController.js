const PrismaClient = require("../configs/PrismaClient");
const prisma = PrismaClient();
const isAuthenticated = require("./IsAuthenticatedController");

// Get request to open a folder
exports.get_view_folder = [
  isAuthenticated,
  async (req, res) => {
    const { id } = req.params;

    try {
      const folder = await prisma.folder.findUnique({
        where: { id: id },
      });
      // Load files in folder
      const files = await prisma.file.findMany({
        where: { folderId: id },
      });
      res.render("viewFolder", {
        title: folder.name + " Folder",
        folder,
        files,
      });
    } catch (error) {
      console.log(error.msg);
    }
  },
];

// Post request to edit a folder
exports.post_edit_folder = [
  isAuthenticated,
  async (req, res) => {
    const { id } = req.params;
    const { editName } = req.body;
    try {
      if (!editName || editName.trim() === "") {
        return res.json({ msg: "You need to enter a new folder name" });
      }
      await prisma.folder.update({
        where: { id: id },
        data: {
          name: editName,
        },
      });
      console.log("Folder edit successful!");
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
    }
  },
];

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

// Post to delete folder
exports.post_delete_folder = [
  isAuthenticated,
  async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.folder.delete({
        where: { id: id },
      });
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
    }
  },
];
