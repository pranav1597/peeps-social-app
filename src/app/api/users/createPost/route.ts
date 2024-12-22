import { connect } from "@/dbConfig/dbConfig"; // MongoDB connection
import Post from "@/models/postModels"; // Your Post model
import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

connect(); // Initialize MongoDB connection

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData(); // Handle multipart form data
    const description = formData.get("description"); // Fetch description
    const files = formData.getAll("posts"); // Get all uploaded files

    if (!description || files.length === 0) {
      return NextResponse.json(
        { error: "Description and at least one file are required" },
        { status: 400 }
      );
    }

    // Convert Buffer into a stream so Cloudinary can upload it
    function bufferToStream(buffer: Buffer): Readable {
      const readable = new Readable();
      readable.push(buffer); // Push buffer content to the stream
      readable.push(null); // Signal that the stream has ended
      return readable;
    }

    const uploadPromises = files.map(async (file) => {
      // Convert file to buffer (binary data)
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Convert buffer to a stream
      const readableStream = bufferToStream(fileBuffer);

      // Upload to Cloudinary using a stream
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error: any, result: any) => {
            if (error) {
              reject(error); // Handle upload error
            } else {
              resolve(result.secure_url); // Return Cloudinary URL
            }
          }
        );

        // Pipe the stream into Cloudinary uploader
        readableStream.pipe(uploadStream);
      });
    });

    const mediaUrls = await Promise.all(uploadPromises); // Get URLs of uploaded files
    console.log(mediaUrls); // Log all Cloudinary URLs

    if (mediaUrls.length === 0) {
      return NextResponse.json(
        { error: "Failed to upload media to Cloudinary" },
        { status: 500 }
      );
    }

    // Save the post in MongoDB
    const newPost = new Post({
      description,
      media: mediaUrls, // Array of uploaded media URLs
      createdAt: new Date(),
    });

    await newPost.save();

    return NextResponse.json(
      {
        message: "Post created successfully!",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post. Please try again." },
      { status: 500 }
    );
  }
}
