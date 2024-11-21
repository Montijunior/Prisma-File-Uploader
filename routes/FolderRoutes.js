const { Router } = require("express");
const FolderController = require("../controllers/FolderController");
const folderRouter = Router();

// Get method to open a single folder
folderRouter.get("/:id", FolderController.get_view_folder);

// Post method to create new folders
folderRouter.post("/create", FolderController.post_create_folder);

module.exports = folderRouter;
