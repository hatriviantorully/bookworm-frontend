// PERBAIKI URL - hapus /api di akhir
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

// Test function untuk debug
export const testBooksEndpoint = async (token) => {
  try {
    console.log("=== BOOKS ENDPOINT TEST ===");
    console.log("🔑 Token available:", !!token);
    console.log("🌐 Testing URL:", `${API_URL}/api/books?page=1&limit=2`);

    // 1. Test debug endpoint dulu
    console.log("1. Testing token debug endpoint...");
    const debugResponse = await fetch(`${API_URL}/api/debug/token-test`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const debugData = await debugResponse.json();
    console.log("🔧 Debug endpoint result:", debugData);

    if (!debugResponse.ok) {
      throw new Error(`Token debug failed: ${JSON.stringify(debugData)}`);
    }

    // 2. Test books endpoint
    console.log("2. Testing books endpoint...");
    const booksResponse = await fetch(`${API_URL}/api/books?page=1&limit=2`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📨 Books response status:", booksResponse.status);

    if (!booksResponse.ok) {
      const errorText = await booksResponse.text();
      console.log("❌ Books response error:", errorText);
      throw new Error(`HTTP ${booksResponse.status}: ${errorText}`);
    }

    const booksData = await booksResponse.json();
    console.log("✅ Books test success:", booksData);
    return {
      success: true,
      data: booksData,
      debug: debugData,
    };
  } catch (error) {
    console.error("❌ Books test failed:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Test function
export const testAPIConnection = async () => {
  try {
    console.log("🔗 Testing connection to:", `${API_URL}/api/health`);
    const response = await fetch(`${API_URL}/api/health`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API Connection Test:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ API Connection Test Failed:", error.message);
    return {
      success: false,
      error: error.message,
      details: "Check if server is running on port 3000",
    };
  }
};
