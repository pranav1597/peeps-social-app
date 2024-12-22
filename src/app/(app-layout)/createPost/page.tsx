"use client";

import React, { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]) as any;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleMediaChange = (e: any) => {
    setMedia([...e.target.files]);
  };

  const handlePostSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("description", description);

    // Append each selected file
    media.forEach((file: any) => formData.append("posts", file));

    try {
      const response = await axios.post("/api/users/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Post created successfully!");
      console.log("Response:", response.data);
      setDescription("");
      setMedia([]);
    } catch (error: any) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      setMessage("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h2>Create a New Post</h2>
      <form onSubmit={handlePostSubmit} encType="multipart/form-data">
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description..."
            required
            style={{
              width: "100%",
              padding: "10px",
              height: "100px",
              marginBottom: "10px",
            }}
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            multiple
            required
            style={{ marginBottom: "10px" }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
