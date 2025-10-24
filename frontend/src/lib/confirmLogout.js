// utils/confirmLogout.js
import { Platform, Alert } from "react-native";

export const confirmLogout = async () => {
  if (Platform.OS === "web") {
    // 🖥️ Versi web
    return window.confirm("Are you sure you want to log out?");
  } else {
    // 📱 Versi mobile (iOS / Android)
    return new Promise((resolve) => {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?", // teks konfirmasi
        [
          { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
          { text: "Logout", onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  }
};
