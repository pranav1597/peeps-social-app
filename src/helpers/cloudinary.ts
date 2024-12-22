import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (fileBuffer: Buffer) => {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto" }, // Automatically determines file type (image, video, etc.)
        (error, result) => {
          if (error) reject(error);
          resolve(result?.secure_url || ""); // Returning the secure Cloudinary URL
        }
      )
      .end(fileBuffer); // Send the file buffer to Cloudinary
  });
};
