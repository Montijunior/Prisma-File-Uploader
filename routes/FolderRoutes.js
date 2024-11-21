const { Router } = require("express");
const FolderController = require("../controllers/FolderController");
const folderRouter = Router();

// Post method to create new folders
folderRouter.post("/create", FolderController.post_create_folder);

module.exports = folderRouter;
