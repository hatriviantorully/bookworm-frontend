import { useState } from "react";
import UploadImage from "../components/UploadImage";
import { API_URL } from "../api/api";
import { toast } from "react-toastify";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageData, setImageData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !caption || !imageData) {
      return toast.error("All fields are required!");
    }

    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          image: imageData,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create");

      toast.success("Book created successfully!");
      setTitle("");
      setCaption("");
      setImageData("");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error creating book");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Book Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: 8 }}
        />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ display: "block", marginBottom: 8 }}
        />
        <UploadImage onChange={setImageData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
