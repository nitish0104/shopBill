import React, { useState, useEffect, createContext, useContext } from "react";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
  //   const prefersDarkMode =
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   setIsDarkMode(prefersDarkMode);
  // }, []);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      <div className={`theme-${isDarkMode ? "dark" : "light"}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

const ThemeContextAuth = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, ThemeContextAuth };
