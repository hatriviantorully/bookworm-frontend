import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "../../components/SafeScreen";
import styles from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { message } = useLocalSearchParams();

  useEffect(() => {
    if (message) {
      console.log("📢 Logout message received:", message);
      Alert.alert("Info", message);
    }
  }, [message]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", result.error);
    }
  };

  return (
    <SafeScreen style={styles.scrollViewStyle}>
      {/* Top Illustration Section - LEBIH BESAR */}
      <View style={styles.topIllustration}>
        <View style={styles.illustrationImage}>
          <Ionicons name="book" size={80} color={COLORS.primary} />
          <Text
            style={{
              marginTop: 10,
              color: COLORS.primary,
              fontWeight: "600",
            }}
          >
            BookWorm
          </Text>
        </View>

        {/* Login Card - LEBIH BESAR */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back! 📚</Text>
            <Text style={styles.subtitle}>
              Sign in to continue your reading journey and discover new books
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Email Input - LEBIH BESAR */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  placeholderTextColor={COLORS.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input - LEBIH BESAR */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button - LEBIH BESAR */}
            <TouchableOpacity
              style={[styles.button, isLoading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Signing In..." : "Sign In to Your Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>New to BookWorm?</Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Create Account</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* SPACER UNTUK TEST SCROLL - HAPUS NANTI */}
        <View style={styles.spacer} />
        <View style={[styles.spacer, { height: 30 }]} />
        <Text
          style={{
            textAlign: "center",
            color: COLORS.textSecondary,
            marginBottom: 20,
          }}
        >
          Scroll test - content continues below ↓
        </Text>
      </View>
    </SafeScreen>
  );
}
