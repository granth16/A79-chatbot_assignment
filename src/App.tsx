import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import MainLayout from "./components/layout/MainLayout";

function App() {
  // Custom hook to detect small screen sizes
  const useSmallScreen = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");

      // Set initial value based on current matches
      setIsSmallScreen(mediaQuery.matches);

      // Define the handler with proper typing for TypeScript
      const handleMediaQueryChange = (e: MediaQueryListEvent) =>
        setIsSmallScreen(e.matches);

      // Listen for changes in screen size
      mediaQuery.addEventListener("change", handleMediaQueryChange);

      // Cleanup listener on component unmount
      return () =>
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return isSmallScreen;
  };

  // Use the custom hook
  const isSmallScreen = useSmallScreen();

  return (
    <div className='App'>
      <Navbar />
      {isSmallScreen ? (
        <div className='small-screen-warning'>
          <p>For a better experience, please view on a larger screen.</p>
        </div>
      ) : (
        <MainLayout />
      )}
    </div>
  );
}

export default App;