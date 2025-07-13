//-----------------------Component to handle logout--------------------

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, logout } from "../store/authSlice";
import { clearSnippets } from "../store/snippetSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSnippets } from "../context/SnippetContext";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    content,
    loading,
    fetchSnippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    resetSnippets,
  } = useSnippets();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.removeItem("token");
        dispatch(clearAuth());
        dispatch(logout());
        dispatch(clearSnippets());
        resetSnippets();
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        
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
