import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Loader from "./components/Loader";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";

export default function App() {
  const { checkAuth, isCheckingAuth, token, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        {!token || !user ? (
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </Route>
        ) : (
          <>
            {/* Main app routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
