import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
export default function Theme() {
  const [style, setStyle] = useState("black")
  const [themeIcon, setThemeIcon] = useState(<Moon />)

  //  On mount, load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("currentTheme") || "black"
    setStyle(savedTheme)
  }, [])

  //  Every time the style atrribute changes, save & apply to DOM & icon
  useEffect(() => {
    localStorage.setItem("currentTheme", style)
    document.documentElement.setAttribute("data-theme", style)
    setThemeIcon(style === "black" ? <Moon /> : <Sun />)
  }, [style])

  // 🔄 Toggle logic
  const handleTheme = () => {
    setStyle(prev => (prev === "black" ? "fantasy" : "black"))
  }

  return (
    <button onClick={handleTheme} className="p-2 text-xl rounded-full transition-tranform hover:scale-110">
      {themeIcon}
    </button>
  )
}