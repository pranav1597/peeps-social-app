import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload a file to Cloudinary
export async function uploadToCloudinary(
  file: Express.Multer.File
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "social-app/posts", resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || ""); // Return the secure URL of the uploaded file
      }
    );

    const bufferStream = Readable.from(file.buffer);
    bufferStream.pipe(uploadStream);
  });
}

export default cloudinary;
