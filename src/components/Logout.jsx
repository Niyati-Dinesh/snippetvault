import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, logout } from "../store/authSlice";
import { clearSnippets } from "../store/snippetSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.removeItem("token");
        dispatch(clearAuth());
        dispatch(logout());
        dispatch(clearSnippets());

        toast.success("Logged out successfully!");
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Try again.");
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return null;
}
