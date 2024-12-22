import { NextResponse } from "next/server";
import cloudinary from "@/helpers/cloudinary";
import multer from "multer";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // Let multer handle the file parsing
  },
};

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "posts", maxCount: 10 },
]);

function parseFormData(req: Request) {
  return new Promise((resolve, reject) => {
    const multerMiddleware = upload as any;
    multerMiddleware(req, {} as any, (err: any) => {
      if (err) return reject(err);
      resolve(req as any);
    });
  });
}

// Helper: Upload file to Cloudinary
async function uploadToCloudinary(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "social-app/posts", resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Secure URL of uploaded file
      }
    );

    const stream = Readable.from(file.buffer);
    stream.pipe(uploadStream); // Stream the file buffer to Cloudinary
  });
}

export async function POST(req: Request) {
  try {
    // Parse form data
    const parsedReq: any = await parseFormData(req);
    const files = parsedReq.files;

    // Upload files to Cloudinary
    const profilePictureFile = files?.profilePicture?.[0];
    const postFiles = files?.posts || [];

    const profilePictureUrl = profilePictureFile
      ? await uploadToCloudinary(profilePictureFile)
      : null;

    const postUrls = await Promise.all(
      postFiles.map((file: any) => uploadToCloudinary(file))
    );

    return NextResponse.json(
      {
        message: "Files uploaded successfully",
        profilePictureUrl,
        postUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred while uploading" },
      { status: 500 }
    );
  }
}
