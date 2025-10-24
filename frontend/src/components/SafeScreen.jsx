// frontend/src/components/SafeScreen.jsx
import React from "react";

export default function SafeScreen({ children, style }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        overflowY: "auto",
        padding: "16px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
