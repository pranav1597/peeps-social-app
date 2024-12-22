import { NextResponse } from "next/server";
import multer from "multer";
import { uploadToCloudinary } from "@/helpers/cloudinary"; // Import the new uploadToCloudinary function
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // We need to disable Next.js's default body parser to use Multer
  },
};

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

export async function POST(req: Request) {
  try {
    const parsedReq: any = await parseFormData(req);
    const files = parsedReq.files;

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
