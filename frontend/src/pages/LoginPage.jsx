import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBook, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import COLORS from "../constants/colors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      alert(message);
      console.log("📢 Logout message received:", message);
    }
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      alert(result.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="illustration">
          <FaBook size={60} color={COLORS.primary} />
          <h2>BookWorm</h2>
        </div>

        <h1 className="login-title">Welcome Back! 📚</h1>
        <p className="login-subtitle">
          Sign in to continue your reading journey and discover new books.
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="icon eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Signing In..." : "Sign In to Your Account"}
          </button>
        </form>

        <div className="footer">
          <p>New to BookWorm?</p>
          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
