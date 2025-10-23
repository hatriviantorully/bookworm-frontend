export const API_URL = import.meta.env.VITE_API_URL;

export async function testConnection() {
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    console.log("✅ Backend connected:", data);
  } catch (error) {
    console.error("❌ Cannot connect to backend:", error);
  }
}
