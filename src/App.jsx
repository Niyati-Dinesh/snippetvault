// App.jsx
import { Heart } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Cards from "./components/Cards";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import { useSelector, useDispatch } from "react-redux";
import IntroSection from "./components/IntroSection";


export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // Function to handle adding snippets (lifted to App level)

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      <NavBar />

      {/* Modal rendered at App level - always available */}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Cards /> : <IntroSection />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <Cards /> : <IntroSection />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
          {/* Remove the AddSnippet route since it's now a modal */}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-3 px-2 mt-10 bg-gradient-to-r from-fuchsia-900/30 via-black/20 to-fuchsia-900/10 border-t border-fuchsia-500/10 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center gap-2 text-sm sm:text-base font-mono text-gray-300">
          <div className="flex flex-row">
            <span>Made with </span>
            <Heart className="text-purple-400 w-5 h-5 animate-pulse m-1" />
            <span> by Niyati</span>
          </div>
          <div className="flex text-xs text-gray-600">
            All rights reserved. ©
          </div>
        </div>
      </footer>

      {/* Neon Grid Background (non-interactive) */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 0, 255, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(195, 140, 247, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
    </div>
  );
}
