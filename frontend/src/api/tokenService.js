// frontend/src/api/tokenService.js

const TOKEN_KEY = "BOOKWORM_TOKEN";

// Simpan token ke localStorage
export const saveToken = async (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Ambil token dari localStorage
export const getToken = async () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Hapus token dari localStorage
export const removeToken = async () => {
  localStorage.removeItem(TOKEN_KEY);
};
