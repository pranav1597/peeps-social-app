"use client"

import React, { useState } from "react";

// CreatePostPage.tsx
export default function CreatePostPage() {
  const [file, setFile] = useState<File | null>(null);
  const [postDescription, setPostDescription] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      const fileUrl = URL.createObjectURL(files[0]);
      setFilePreview(fileUrl); // Preview the selected file
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !postDescription) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("posts", file);
    formData.append("description", postDescription);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={postDescription}
          onChange={handleDescriptionChange}
          placeholder="Post Description"
          className="border p-2 w-full rounded-md text-slate-800"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*, video/*"
          className="border p-2 w-full rounded-md"
        />
        {filePreview && (
          <div className="mt-3">
            <img src={filePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md"
        >
          Post
        </button>
      </form>
    </div>
  );
}

