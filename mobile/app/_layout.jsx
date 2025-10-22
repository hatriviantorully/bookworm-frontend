// app/_layout.jsx
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "./toastConfig";

export default function RootLayout() {
  const { checkAuth, isCheckingAuth, token, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Loader sementara menunggu checkAuth selesai
  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!token || !user ? (
          <Stack.Screen name="(auth)" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </>
  );
}
