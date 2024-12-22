"use client"

import React, { useState } from "react";

export default function CreatePostPage() {
  const [file, setFile] = useState<File | null>(null);
  const [postDescription, setPostDescription] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]); // Select the first file for the post
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostDescription(event.target.value); // Handle text input
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !postDescription) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file); // If profile picture is used
    formData.append("posts", file); // Upload post image as file
    formData.append("description", postDescription); // Add description field

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={postDescription}
        onChange={handleDescriptionChange}
        placeholder="Post Description"
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Post</button>
    </form>
  );
}
