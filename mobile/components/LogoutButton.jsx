import { useAuthStore } from "../store/authStore";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Toast.show({
        type: "success",
        text1: "Logout successfully!",
        text2: "See you next time!",
        onHide: () => router.replace("/login"), // ✅ Navigasi setelah toast hilang
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Failed to logout!",
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.logoutButton, { backgroundColor: "red" }]}
      onPress={handleLogout}
      activeOpacity={0.7}
    >
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>LOGOUT</Text>
    </TouchableOpacity>
  );
}
