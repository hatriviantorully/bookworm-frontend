// frontend/src/api.js
export const testConnection = async () => {
  console.log("🌐 Testing backend connection...");

  try {
    const res = await fetch("https://bookworm-app-v2.onrender.com/api/health");
    const data = await res.json();

    console.log("✅ Backend Connected:", data);
    return data;
  } catch (error) {
    console.error("❌ Backend connection failed:", error.message);
  }
};
