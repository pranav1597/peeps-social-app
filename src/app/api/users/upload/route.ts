import { NextApiRequest, NextApiResponse } from "next";
import uploadFields from "@/middlewares/multer"; // Import your multer setup

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to allow Multer to handle it
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Return a promise because Multer works asynchronously
    return new Promise((resolve, reject) => {
      uploadFields(req as any, res as any, (err: any) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // After file upload, you can access the files in req.files
        const profilePictureUrl = req?.files?.profilePicture
          ? req.files.profilePicture[0].path // Handle single file
          : null;
        const postUrls = req?.files?.posts
          ? req.files.posts.map((file: any) => file.path) // Handle multiple files (posts)
          : [];

        // Respond with the file URLs
        return res.status(200).json({
          profilePictureUrl,
          postUrls, // Respond with URLs for both profile picture and posts
        });
      });
    });
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
