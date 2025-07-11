import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SquareChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const routes = {
    "Sign In": "/signin",
    "Sign Up": "/signup",
    "Logout": "/logout",
  };

  const buttons = isAuthenticated
    ? [ "Logout"]
    : ["Sign In", "Sign Up"];

  return (
    <>
      {/* (unchanged styling and structure - only removed props) */}
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
          <ul className="hidden md:flex gap-4 lg:gap-8 text-white font-medium tracking-wide">
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
            <ul className="flex flex-col gap-3 text-white font-medium tracking-wide">
              {buttons.map((item, index) => (
                <li key={index}>
                  <Link
                    to={routes[item]}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative block px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] backdrop-blur-sm overflow-hidden"
                  >
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
    </>
  );
}