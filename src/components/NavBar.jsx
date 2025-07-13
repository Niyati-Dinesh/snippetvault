import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SquareChevronRight, User, Settings, Code, Zap, ChevronDown, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useSnippets } from "../context/SnippetContext"; // Import the Context API hook

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // Use Context API for snippets instead of Redux
  const {
    content,
    loading,
    fetchSnippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    resetSnippets,
  } = useSnippets();
  
  // Get actual user data from Redux store
  const user = useSelector((state) => state.auth.user);
 
  // Fallback data if user exists but some fields are missing
  const userData = user ? {
    name: "User",
    email: user.email || "user@example.com",
    avatar: user.email.charAt(0).toUpperCase(),
    snippetsCount: content.length || 0, // Now uses Context API data
    joinDate: user.joinDate || user.createdAt || "2024"
  } : null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const routes = {
    "Sign In": "/signin",
    "Sign Up": "/signup",
    "Logout": "/logout",
  };

  const buttons = isAuthenticated
    ? ["Logout"]
    : ["Sign In", "Sign Up"];

  // Generate initials from user name
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <>
    
      <div className="sticky top-0 z-50 p-4 sm:p-6 bg-gradient-to-r from-black/95 to-fuchsia-950/95 border-b border-fuchsia-500/40 backdrop-blur-xl shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Name */}
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wider font-mono relative z-10">
              <SquareChevronRight className="inline w-8 h-8 mr-3" />
              <span className="bg-gradient-to-r from-white via-fuchsia-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                SnippetVault
              </span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-lg blur-lg animate-pulse"></div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {/* User Profile (Desktop) - Only show if authenticated and user exists */}
            {isAuthenticated && userData && (
              <div className="relative cursor-pointer">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] backdrop-blur-sm group"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm border-2 border-fuchsia-300/50 shadow-lg">
                      {userData.avatar}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex flex-col items-start">
                    <span className="text-white font-mono text-sm font-medium">{userData.name}</span>
                    <span className="text-fuchsia-300 text-xs flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {userData.snippetsCount} snippets
                    </span>
                  </div>
                  
                  <ChevronDown className={`w-4 h-4 text-fuchsia-300 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-black/95 to-fuchsia-950/95 border border-fuchsia-500/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-fuchsia-500/30 bg-gradient-to-r from-fuchsia-900/20 to-pink-900/20">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg border-2 border-fuchsia-300/50 shadow-lg">
                            {userData.avatar}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-mono font-bold">{userData.name}</h3>
                          <p className="text-fuchsia-300 text-sm">{userData.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="p-4 border-b border-fuchsia-500/30">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-fuchsia-400 mb-1">
                            <Code className="w-4 h-4" />
                            <span className="text-white font-mono font-bold text-lg">{userData.snippetsCount}</span>
                          </div>
                          <p className="text-gray-400 text-xs">Code Snippets</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-pink-400 mb-1">
                            <Zap className="w-4 h-4" />
                            <span className="text-white font-mono font-bold text-lg">99</span>
                          </div>
                          <p className="text-gray-400 text-xs">Productivity</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link 
                        to="/logout" 
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-900/30 transition-all duration-200 text-white font-mono text-sm group"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons (Desktop) - Only show if not authenticated */}
            {!isAuthenticated && (
              <ul className="flex gap-4 lg:gap-8 text-white font-medium tracking-wide">
                {buttons.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={routes[item]}
                      className="group relative px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] backdrop-blur-sm overflow-hidden"
                    >
                      <span className="relative z-10 font-mono text-sm lg:text-base">
                        {item}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 to-pink-500/0 group-hover:from-fuchsia-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative p-2 rounded-lg bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white mt-1 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Nav Items */}
        <div
          className={`md:hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="pt-4 pb-2">
            {/* Mobile User Profile - Only show if authenticated and user exists */}
            {isAuthenticated && userData && (
              <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-fuchsia-900/30 to-pink-900/30 border border-fuchsia-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-bold border-2 border-fuchsia-300/50 shadow-lg">
                      {userData.avatar }
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-mono font-bold">{userData.name}</h3>
                    <p className="text-fuchsia-300 text-sm">{userData.email}</p>
                  </div>
                </div>
                <div className="flex justify-around text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-fuchsia-400 mb-1">
                      <Code className="w-4 h-4" />
                      <span className="text-white font-mono font-bold">{userData.snippetsCount}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Snippets</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-pink-400 mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-white font-mono font-bold">99</span>
                    </div>
                    <p className="text-gray-400 text-xs">Productivity</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Items */}
            <ul className="flex flex-col gap-3 text-white font-medium tracking-wide">

              {/* Auth buttons */}
              {buttons.map((item, index) => (
                <li key={index}>
                  <Link
                    to={routes[item]}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] backdrop-blur-sm overflow-hidden"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="relative z-10 font-mono">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 to-pink-500/0 group-hover:from-fuchsia-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent animate-pulse"></div>
      </div>

      {/* Overlay for dropdown */}
      {isProfileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsProfileDropdownOpen(false)}
        ></div>
      )}
    </>
  );
}