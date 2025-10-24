// src/components/Loader.jsx
import React from "react";
import COLORS from "../constants/colors";

export default function Loader({ size = 60 }) {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size / 10}px solid #f3f3f3`,
    borderTop: `${size / 10}px solid ${COLORS.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: COLORS.background,
      }}
    >
      <div style={spinnerStyle}></div>

      {/* Tambahkan CSS keyframes global */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
