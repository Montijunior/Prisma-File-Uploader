const UploadController = require("../controllers/UploadController");
const { Router } = require("express");
const UploadRouter = Router();

// Post request to upload files
UploadRouter.post("/:id/upload", UploadController.post_upload_file);

module.exports = UploadRouter;
