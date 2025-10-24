import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaUser } from "react-icons/fa";
import COLORS from "../constants/colors";
import "../assets/styles/tabLayout.css";

export default function TabLayout() {
  return (
    <div className="tab-layout">
      <nav
        className="tab-bar"
        style={{ backgroundColor: COLORS.cardBackground }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          <FaHome /> Home
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          <FaPlusCircle /> Create
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "tab-link active" : "tab-link"
          }
        >
          <FaUser /> Profile
        </NavLink>
      </nav>

      <main className="tab-content">
        <Outlet />{" "}
        {/* Halaman anak (HomePage, CreatePage, ProfilePage) akan dirender di sini */}
      </main>
    </div>
  );
}
