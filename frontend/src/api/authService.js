// frontend/src/api/authService.js
import { API_URL } from "../constants/api"; // Menyesuaikan URL base API

// Utility untuk parsing JSON
async function parseJSON(response) {
  const text = await response.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return { raw: text };
  }
}

// Fungsi untuk mendapatkan token dari localStorage
export const getToken = () => {
  return localStorage.getItem("token"); // Atau bisa menggunakan sessionStorage jika perlu
};

// Fungsi untuk menyimpan token ke localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Fungsi untuk menghapus token dari localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Fungsi untuk mendaftar pengguna baru
export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    // Menghilangkan '/api' di URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await parseJSON(res);
  return { status: res.status, ok: res.ok, data };
}

// Fungsi untuk login pengguna
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    // Menghilangkan '/api' di URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJSON(res);
  return { status: res.status, ok: res.ok, data };
}
