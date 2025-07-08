import React from "react";
import NavBar from "./components/NavBar";
import IntroSection from "./components/IntroSection";
import Cards from "./components/Cards";
import Signup from "./components/signup";
import Signin from "./components/signin";
import { Heart } from "lucide-react";
export default function App() {
  const auth = ["SignIn", "SignUp"];
  const home = ["Add Snippet"];
  return (
    <div className="min-h-screen bg-black">
      <NavBar buttons={auth} />

      {/* Body */}
      <div className="relative min-h-screen bg-black p-8">
        {/* Content */}
        {/*<IntroSection/>*/}
        <Signin />
        {/*TODO:
        Change alerts to react hot toast , 
        modify routes and correct it , 
        toggle properly
        Backend
        Integration*/}
        <Signup />

        {/*Footer*/}
        <footer className="w-full mt-20 text-center py-3 px-2 bg-gradient-to-r from-fuchsia-900/30 via-black/20 to-fuchsia-900/10 border-t border-fuchsia-500/10 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-2 text-sm sm:text-base font-mono text-gray-300">
            <div className="flex flex-row ">
            <span>Made with </span>
            <Heart className="text-purple-400 w-5 h-5 animate-pulse m-1" />
            <span> by Niyati</span></div>
            <div className="flex text-xs text-gray-600">All rights reserved. ©</div>
          </div>
        </footer>
        {/* Holographic grid background */}
        <div className="min-h-screen absolute inset-0 opacity-10 z-0 pointer-events-none">
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
    </div>
  );
}
