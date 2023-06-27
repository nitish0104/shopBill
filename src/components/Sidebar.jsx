import React, { useEffect, useRef, useState } from "react";

import { ContextAuth } from "../context/Context";

import { Link } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContextAuth } from "../context/ThemeContext";
import { BsSun } from "react-icons/bs";
import { GrPowerShutdown } from "react-icons/gr";

const Sidebar = () => {
  const { isDarkMode, toggleMode } = ThemeContextAuth();
  const { userDetails } = ContextAuth();

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      console.log(userDetails);
    };
  }, []);

  return (
    <>
      <div className="relative z-50 backdrop-blur-sm transition duration-300 ease-in-out ">
        <div className="flex justify-between items-center shadow-lg h-16 bg-blue-400  px-4">
          <button
            className={`flex justify-center items-center rounded-full p-2  bg-red-500 text-sm hover:bg-red-600`}
          >
            <GrPowerShutdown></GrPowerShutdown>
          </button>

          <div
            className={`   font-bold pr-10 text-2xl ${
              isDarkMode ? " text-black" : " text-gray-800"
            } `}
          >
            Shop Connect
          </div>

          <button
            className={`rounded-full p-2   ${
              isDarkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
            } `}
            onClick={toggleMode}
          >
            {isDarkMode ? <BsSun className="" /> : <MdOutlineDarkMode />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
