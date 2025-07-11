// showToast.js
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const showToast = (message) =>
  toast(message, {
    icon: <AlertCircle />,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

export default showToast;
