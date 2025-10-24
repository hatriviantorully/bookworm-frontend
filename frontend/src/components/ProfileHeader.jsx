// src/components/ProfileHeader.jsx
import React from "react";
import { useAuthStore } from "../store/authStore";
import { formatMemberSince } from "../lib/utils";
import "../assets/styles/profile.css"; // pastikan style sesuai

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="profile-header">
      <img
        src={user.profileImage}
        alt={user.username}
        className="profile-image"
      />
      <div className="profile-info">
        <p className="username">{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="member-since">
          🗓️ Joined {formatMemberSince(user.createdAt)}
        </p>
      </div>
    </div>
  );
}
