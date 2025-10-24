import { Outlet } from "react-router-dom";
import COLORS from "../constants/colors";
import "../assets/styles/authLayout.css";

export default function AuthLayout() {
  return (
    <div
      className="auth-layout"
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Tempat di mana halaman anak (Login atau Signup) akan dirender */}
      <Outlet />
    </div>
  );
}
