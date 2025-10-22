import { create } from "zustand";
import { storage } from "../lib/storage";
import { API_URL } from "../constants/api";
import Toast from "react-native-toast-message";

// Helper untuk cek token valid
async function verifyToken(token) {
  try {
    const res = await fetch(`${API_URL}/api/auth/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch (error) {
    console.error("❌ verifyToken error:", error);
    return false;
  }
}

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: false,
  error: null,

  clearError: () => set({ error: null }),

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });

    if (!username || !email || !password) {
      set({ isLoading: false, error: "All fields are required" });
      return { success: false, error: "All fields are required" };
    }
    if (password.length < 6) {
      set({
        isLoading: false,
        error: "Password must be at least 6 characters",
      });
      return { success: false, error: "Password too short" };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      console.log("🧠 Register response:", data);

      if (!response.ok) {
        set({ isLoading: false });
        Toast.show({
          type: "error",
          text1: "Registration failed!",
        });
        return { success: false, error: data.message || "Registration failed" };
      }
      if (!data.token || !data.user)
        throw new Error("Missing token or user data");

      await storage.set("token", data.token);
      await storage.set("user", JSON.stringify(data.user));

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
        error: null,
      });
      Toast.show({
        type: "success",
        text1: "Account created successfully!",
        text2: "Data has been saved.",
      });
      return { success: true, user: data.user };
    } catch (error) {
      console.error("❌ Register error:", error);
      const message = error.message || "Registration failed";
      set({ isLoading: false, error: message });
      Toast.show({
        type: "error",
        text1: "Email already exist!",
      });
      return { success: false, error: message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    if (!email || !password) {
      set({ isLoading: false, error: "Email and password are required!" });
      Toast.show({
        type: "error",
        text1: "Email and Password are required!",
      });
      return { success: false, error: "Email and password are required!" };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      if (!data.token || !data.user)
        throw new Error("Missing token or user data");

      await storage.set("token", data.token);
      await storage.set("user", JSON.stringify(data.user));

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
        error: null,
      });
      Toast.show({
        type: "success",
        text1: "Login successfully!",
        text2: "Enjoy this site!.",
      });
      return { success: true, user: data.user };
    } catch (error) {
      console.error("❌ Login error:", error);
      const message = error.message || "Login failed";
      set({ isLoading: false, error: message });
      Toast.show({
        type: "error",
        text1: "Login failed!",
      });
      return { success: false, error: message };
    }
  },

  refreshToken: async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: await storage.get("token") }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Refresh failed");

      await storage.set("token", data.token);
      set({ token: data.token });
      return data.token;
    } catch (err) {
      console.error("❌ Refresh token failed:", err);
      return null;
    }
  },

  checkAuth: async () => {
    console.log("⏳ [checkAuth] Mulai cek auth...");
    set({ isCheckingAuth: true });
    try {
      const [storedToken, userJson] = await Promise.all([
        storage.get("token"),
        storage.get("user"),
      ]);

      console.log("🔐 [checkAuth] Token di storage:", storedToken);
      console.log("👤 [checkAuth] User di storage:", userJson);
      let tokenToUse = storedToken;

      if (storedToken) {
        const isValid = await verifyToken(storedToken);
        if (!isValid) {
          const newToken = await get().refreshToken();
          if (!newToken) {
            set({ token: null, user: null });
            return;
          }
          tokenToUse = newToken;
        }
      }

      const user = userJson ? JSON.parse(userJson) : null;
      if (tokenToUse && user?.id && user?.email) {
        set({ token: tokenToUse, user, error: null });
      } else {
        await Promise.all([storage.remove("token"), storage.remove("user")]);
        set({ token: null, user: null, error: null });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ token: null, user: null, error: null });
    } finally {
      console.log("✅ checkAuth done");
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await storage.remove("token");
      await storage.remove("user");
      set({ token: null, user: null });
      return true;
    } catch (error) {
      console.error("❌ Logout error:", error);
      return false;
    }
  },
}));
