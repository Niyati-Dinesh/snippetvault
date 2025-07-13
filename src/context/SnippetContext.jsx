//context api for snippets

import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance"; 
import toast from "react-hot-toast";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/manage/fetchsnippet"); // ✅ uses updated axios
      const snippets = response.data.snippets || [];
      setContent(snippets);
    } catch (err) {
      console.error("Failed to fetch snippets", err);
      toast.error("Couldn't load snippets");
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  const addSnippet = (newSnippet) => {
    setContent((prev) => [newSnippet, ...prev]);
  };

  const updateSnippet = (updatedSnippet) => {
    setContent((prev) =>
      prev.map((item) =>
        item._id === updatedSnippet._id ? updatedSnippet : item
      )
    );
  };

  const deleteSnippet = (id) => {
    setContent((prev) => prev.filter((item) => item._id !== id));
  };

  const resetSnippets = () => {
    setContent([]);
  };

  return (
    <SnippetContext.Provider
      value={{
        content,
        loading,
        fetchSnippets,
        addSnippet,
        updateSnippet,
        deleteSnippet,
        resetSnippets,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => useContext(SnippetContext);
