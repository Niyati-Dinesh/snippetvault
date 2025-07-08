import React from "react";
import NavBar from "./components/NavBar";
import IntroSection from "./components/IntroSection";
import Cards from "./components/Cards";

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

        <Cards></Cards>

        {/* Holographic grid background */}
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
    </div>
  );
}
