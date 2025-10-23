// mobile/services/tokenService.js
import * as SecureStore from "expo-secure-store";
const TOKEN_KEY = "BOOKWORM_TOKEN";
export async function saveToken(token) {
  return SecureStore.setItemAsync(TOKEN_KEY, token);
}
export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}
export async function removeToken() {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}
