import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import Icon from "react-native-vector-icons/Feather"; // pastikan sudah di-install

// Warna tema lembut & profesional
const colors = {
  success: { bg: "#ECFDF5", text: "#065F46", icon: "#10B981" }, // hijau lembut
  error: { bg: "#FEF2F2", text: "#991B1B", icon: "#EF4444" }, // merah lembut
  info: { bg: "#EFF6FF", text: "#1E40AF", icon: "#3B82F6" }, // biru lembut
  warning: { bg: "#FFFBEB", text: "#92400E", icon: "#F59E0B" }, // kuning lembut
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      renderLeadingIcon={() => (
        <Icon name="check-circle" size={28} color={colors.success.icon} />
      )}
      style={{
        borderLeftColor: colors.success.icon,
        backgroundColor: colors.success.bg,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "700",
        color: colors.success.text,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.success.text,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      renderLeadingIcon={() => (
        <Icon name="x-circle" size={28} color={colors.error.icon} />
      )}
      style={{
        borderLeftColor: colors.error.icon,
        backgroundColor: colors.error.bg,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "700",
        color: colors.error.text,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.error.text,
      }}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      renderLeadingIcon={() => (
        <Icon name="info" size={28} color={colors.info.icon} />
      )}
      style={{
        borderLeftColor: colors.info.icon,
        backgroundColor: colors.info.bg,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "700",
        color: colors.info.text,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.info.text,
      }}
    />
  ),

  warning: (props) => (
    <BaseToast
      {...props}
      renderLeadingIcon={() => (
        <Icon name="alert-triangle" size={28} color={colors.warning.icon} />
      )}
      style={{
        borderLeftColor: colors.warning.icon,
        backgroundColor: colors.warning.bg,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "700",
        color: colors.warning.text,
      }}
      text2Style={{
        fontSize: 15,
        color: colors.warning.text,
      }}
    />
  ),
};
