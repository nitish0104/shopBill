import React, { useState, useEffect, createContext, useContext } from "react";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  
useEffect(() => {
  const themeData = localStorage.getItem('dark')
  if(themeData  === "true") {
    setIsDarkMode(true)
  }else if(themeData === "false"){
    setIsDarkMode(false)
  }else{
    setIsDarkMode(false)
  }
}, [])

  


  const toggleMode = () => {
    localStorage.setItem("dark", !isDarkMode)
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
