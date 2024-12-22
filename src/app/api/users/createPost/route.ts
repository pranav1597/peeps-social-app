import { NextResponse } from "next/server";
// import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModels"; // Assuming a Post model exists
import { uploadToCloudinary } from "@/helpers/cloudinary"; // Reuse Cloudinary upload function

export async function POST(req: Request) {
  try {
    const { files, description } = await req.json();

    if (!files || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save the post to database after successful file upload to Cloudinary
    const postUrls = await Promise.all(
      files.map(async (file: any) => uploadToCloudinary(file))
    );

    const newPost = await Post.create({
      description,
      images: postUrls, // Save uploaded images URLs in the database
    });

    return NextResponse.json({ message: "Post created successfully", newPost });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create post", details: error.message },
      { status: 500 }
    );
  }
}
