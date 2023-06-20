import React from "react";
import { ThemeContextAuth } from "../../context/ThemeContext";

const LayoutManin = ({ children, className }) => {
  const { isDarkMode } = ThemeContextAuth();

  return (
    <div
      // className={`absolute bg-gray-800 w-screen min-h-screen h-fit ${className}`}
      className={`w-screen min-h-screen h-fit ${className} bg-${
        isDarkMode ? "gray-800" : "cyan-100"
      } text-${isDarkMode ? "white" : "gray-800"} `}
    >
      {children}
    </div>
  );
};

export default LayoutManin;
