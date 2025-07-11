import React from "react";
import { useSelector } from "react-redux";
import Cards from "./cards";
import IntroSection from "./IntroSection";
import NavBar from "./NavBar"; 

const Page = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        
        <>
          <NavBar/>
          <Cards />
        </>
      ) : (
        <>
          <NavBar/>
          <IntroSection />
        </>
      )}
    </>
  );
};

export default Page; // <- Fix capital "P" in filename too if needed
