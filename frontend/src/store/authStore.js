import { create } from "zustand";
import { storage } from "../lib/storage"; // frontend web
import { API_URL } from "../api/api";
import toast from "react-hot-toast";

async function _verifyToken(token) {
  try {
    const res = await fetch(`${API_URL}/auth/check-token`, {
      // hapus /api jika perlu
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch (error) {
    console.error("❌ _verifyToken error:", error);
    return false;
  }
}

export const useAuthStore = create((set) => ({
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
      toast.error("All fields are required");
      return { success: false };
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      await storage.set("token", data.token);
      await storage.set("user", JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isLoading: false });
      toast.success("Account created successfully!");
      return { success: true, user: data.user };
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: err.message });
      toast.error(err.message);
      return { success: false };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    if (!email || !password) {
      set({ isLoading: false, error: "Email and password required" });
      toast.error("Email and password required");
      return { success: false };
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      await storage.set("token", data.token);
      await storage.set("user", JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isLoading: false });
      toast.success("Login successfully!");
      return { success: true, user: data.user };
    } catch (err) {
      console.error(err);
      set({ isLoading: false, error: err.message });
      toast.error(err.message);
      return { success: false };
    }
  },

  logout: async () => {
    await storage.remove("token");
    await storage.remove("user");
    set({ token: null, user: null });
    toast.success("Logged out successfully!");
    return true;
  },
}));
