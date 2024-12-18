import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder:
      file.fieldname === "profilePicture" ? "profile_pictures" : "posts",
    public_id: `${file.fieldname}-${Date.now()}`,
    format: req.file?.mimetype.split('/')[1],  // This will handle dynamic formats.
  }),
});

const uploadFields = multer({ storage }).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "posts", maxCount: 5 },
]);

export default uploadFields;
