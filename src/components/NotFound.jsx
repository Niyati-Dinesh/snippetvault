import React from "react";
import { HeartCrack } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white font-mono px-4 text-center">
      <img
        src="/404.png"
        alt="Page Not Found"
        className="w-96 max-w-full mb-6 animate-pulse"
      />
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
        Oops! This page doesn’t exist.
      </h2>
      <p className="text-gray-400 text-sm sm:text-base flex items-center justify-center gap-1">
        Maybe you took a wrong turn in the matrix,
        <HeartCrack className="w-5 h-5 text-pink-400 ml-1" />
      </p>
    </div>
  );
}
