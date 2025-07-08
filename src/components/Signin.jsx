import React, { useState } from "react";
import {
  Terminal,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log('Signin:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-16">
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-fuchsia-500/30 backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30">
              <Terminal className="w-8 h-8 text-fuchsia-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white font-mono mb-2">
            <span className="bg-gradient-to-r from-white via-fuchsia-200 to-white bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h2>
          <p className="text-gray-400 text-sm font-mono">Sign in to your SnippetVault</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-fuchsia-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-900/50 to-black/50 border border-fuchsia-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/20 backdrop-blur-sm font-mono transition-all duration-300"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-fuchsia-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 bg-gradient-to-r from-gray-900/50 to-black/50 border border-fuchsia-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-500/20 backdrop-blur-sm font-mono transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 p-1 rounded hover:bg-fuchsia-500/20 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-900/50 to-pink-900/50 border border-fuchsia-500/30 hover:border-fuchsia-400/60 text-white font-mono font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] backdrop-blur-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

        {/* Glow Layer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 pointer-events-none"></div>
      </div>
    </div>
  );
}
