import { getToken } from "./tokenService";

export async function authFetch(url, options = {}) {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text || "{}");
  } catch {
    data = { raw: text };
  }
  return { status: res.status, ok: res.ok, data };
}
