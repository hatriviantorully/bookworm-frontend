// src/lib/toastUtils.js
import { toast } from "react-hot-toast";

export const showSuccess = (msg) => toast.success(msg);
export const showError = (msg) => toast.error(msg);

// Fungsi helper untuk memunculkan toast
export const showToast = {
  success: (msg) => toast.success(msg, { autoClose: 3000 }),
  error: (msg) => toast.error(msg, { autoClose: 3000 }),
  info: (msg) => toast.info(msg, { autoClose: 3000 }),
  warning: (msg) => toast.warn(msg, { autoClose: 3000 }),
};
