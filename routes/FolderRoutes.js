const { Router } = require("express");
const FolderController = require("../controllers/FolderController");
const folderRouter = Router();

// Post method to create new folders
folderRouter.post("/create", FolderController.post_create_folder);

// Get method to open a single folder
folderRouter.get("/:id", FolderController.get_view_folder);

// Post method to edit folder
folderRouter.post("/:id/edit", FolderController.post_edit_folder);

// Post method to delete folders
folderRouter.post("/:id/delete", FolderController.post_delete_folder);

module.exports = folderRouter;
