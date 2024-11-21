const PrismaClient = require("../configs/PrismaClient");
const isAuthenticated = require("./IsAuthenticatedController");
const upload = require("../configs/multer-config");
const cloudinary = require("../configs/cloudinary-config");
const prisma = PrismaClient();

// Post method to upload files
exports.post_upload_file = [
  isAuthenticated,
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { file } = req; // req.file is the uploaded file
    const filePath = file.path;

    // Transformation options for Cloudinary upload
    const transformationOptions = {
      width: 500,
      crop: "scale", // Maintains aspect ratio while resizing
      quality: "auto", // Automatically adjusts image quality
      fetch_format: "auto", // Automatically adjusts the image format
    };

    try {
      if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      // Upload the file to Cloudinary with transformations
      const result = await cloudinary.uploader.upload(filePath, {
        transformation: [transformationOptions],
      });

      // Save the result in the database (Prisma)
      await prisma.file.create({
        data: {
          name: file.originalname,
          url: result.secure_url, // Cloudinary URL of the uploaded image
          filesize: result.bytes, // File size
          folderId: id, // Folder the file is associated with
        },
      });

      // Optionally, delete the file from the server after uploading
      const fs = require("fs");
      fs.unlinkSync(filePath); // Delete local file after upload to Cloudinary

      // Redirect to the folder page
      res.redirect(`/folder/${id}`);
    } catch (error) {
      console.error("Error during file upload:", error);
      res.status(500).json({ message: "File upload failed." });
    }
  },
];
