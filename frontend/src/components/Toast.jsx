import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component ToastContainer harus di-render di App.jsx
export default function Toast() {
  return <ToastContainer position="top-right" newestOnTop />;
}
