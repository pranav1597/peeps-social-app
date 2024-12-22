// createPost/page.tsx
"use client";
import { useState } from "react";

const CreatePost = () => {
  const [description, setDescription] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mediaFiles || mediaFiles.length === 0) {
      alert("Please select media.");
      return;
    }

    setLoading(true);

    // FormData to handle file and text submission
    const formData = new FormData();
    formData.append("description", description);
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append("media", mediaFiles[i]);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        // Handle success (You can show a success message or redirect to a post feed)
        alert("Post created successfully!");
        setDescription(""); // Clear description
        setMediaFiles(null); // Reset media files
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description..."
            required
          />
        </div>

        <div>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => setMediaFiles(e.target.files)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
