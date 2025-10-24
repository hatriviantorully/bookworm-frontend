// src/components/LogoutButton.jsx
import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import COLORS from "../constants/colors";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      toast.success("Logout successfully! See you next time!", {
        onClose: () => navigate("/login"), // navigasi setelah toast hilang
        autoClose: 2000,
      });
    } else {
      toast.error("Failed to logout!");
    }
  };

  return (
    <button
      className="logout-button"
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      <FiLogOut size={20} />
      LOGOUT
    </button>
  );
}
