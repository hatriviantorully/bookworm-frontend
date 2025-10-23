// mobile/services/authService.js
import { API_URL } from "../constants/api"; // sesuaikan path

async function parseJSON(response) {
  const text = await response.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return { raw: text };
  }
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    // <-- note /api
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await parseJSON(res);
  return { status: res.status, ok: res.ok, data };
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJSON(res);
  return { status: res.status, ok: res.ok, data };
}
