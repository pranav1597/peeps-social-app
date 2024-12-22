import { NextResponse } from "next/server";
import multer from "multer";
import { uploadToCloudinary } from "@/helpers/cloudinary"; // Make sure to import the upload helper
import { connect } from "@/dbConfig/dbConfig"; // Your DB connection setup
import Post from "@/models/postModels"; // Your Post model

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle files manually
  },
};

// Multer setup to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([{ name: "media", maxCount: 10 }]); // Supporting multiple files

// Function to parse FormData (handle files from request)
function parseFormData(req: Request) {
  return new Promise((resolve, reject) => {
    upload(req as any, {} as any, (err: any) => {
      if (err) return reject(err);
      resolve(req);
    });
  });
}

export async function POST(req: Request) {
  try {
    const parsedReq: any = await parseFormData(req);
    const { description } = parsedReq.body;
    const files = parsedReq.files?.media || [];

    if (!description || files.length === 0) {
      return NextResponse.json(
        { error: "Description and media are required" },
        { status: 400 }
      );
    }

    await connect(); // Ensure DB connection

    // Upload each file to Cloudinary and collect the URLs
    const mediaUrls = await Promise.all(
      files.map((file: any) => uploadToCloudinary(file))
    );

    // Create a new Post with description and media URLs
    const newPost = new Post({
      user: "userIdHere", // Replace with the user’s actual ID
      description,
      media: mediaUrls, // Store media URLs as an array
    });

    await newPost.save(); // Save post to the DB

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
