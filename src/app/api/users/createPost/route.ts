import { NextRequest } from "next/server";
import upload from "@/middlewares/multer"; // Import multer middleware
import { uploadToCloudinary } from "@/helpers/cloudinary"; // Cloudinary helper function

export const config = {
  api: {
    bodyParser: false, // Important: Disable bodyParser for multer
  },
};

export const uploadHandler = async (req: NextRequest) => {
  // Creating a new promise for handling file uploads
  return new Promise((resolve, reject) => {
    // Use the multer middleware (must process files first)
    upload(req as any, {} as any, async (err: any) => {
      if (err) {
        return reject(err); // If error with multer, reject promise
      }

      try {
        // Multer stores files in `req.files` after parsing
        const formData = new URLSearchParams(await req.text()); // Parsing form fields (description)
        const description = formData.get("description"); // Extracting description

        // You need to manually access req.files after multer's parsing
        const files = (req as any).files; // Now `req.files` should exist

        // Validate if files are present
        if (!files || files.length === 0) {
          return reject("No files uploaded");
        }

        // Upload files to Cloudinary
        const fileUrls = await Promise.all(
          files.map(async (file: any) => {
            const mediaUrl = await uploadToCloudinary(file.buffer); // Upload buffer to Cloudinary
            return mediaUrl; // Return URL after upload
          })
        );

        resolve({ description, media: fileUrls }); // Resolving with description and media URLs
      } catch (cloudError) {
        reject(`Error uploading to Cloudinary: ${cloudError}`);
      }
    });
  });
};
