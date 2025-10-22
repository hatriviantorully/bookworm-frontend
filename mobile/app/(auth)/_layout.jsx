// app/(auth)/_layout.jsx
import { Stack } from "expo-router";
import COLORS from "../../constants/colors";

export default function AuthLayout() {
  // Tidak perlu memanggil checkAuth() lagi di sini
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
