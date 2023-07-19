import React from "react";
import { ThemeContextAuth } from "../../context/ThemeContext";

const LayoutMain = ({ children, className }) => {
  const { isDarkMode } = ThemeContextAuth();

  return (
    <div
      // className={`absolute bg-gray-800 w-screen min-h-screen h-fit ${className}`}
      className={`w-screen min-h-screen h-fit ${className} ${
        isDarkMode ? "bg-[#111827]" : "bg-cyan-100"
      } text-${isDarkMode ? "white" : "gray-800"} `}
    >
      {children}
    </div>
  );
};

export default LayoutMain;
