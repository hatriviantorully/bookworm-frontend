import { useState } from "react";
import { ImageUtils } from "../lib/imageUtils";

export default function UploadImage({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64 = await ImageUtils.fileToBase64(file);
      const dataUrl = ImageUtils.createDataUrl(base64, file.type);
      setPreview(dataUrl);

      if (onChange) onChange(dataUrl);
    } catch (err) {
      console.error("❌ UploadImage error:", err.message);
      alert("Invalid image file!");
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: 150, height: 150, objectFit: "cover", marginTop: 8 }}
        />
      )}
    </div>
  );
}
