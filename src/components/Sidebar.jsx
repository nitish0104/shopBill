import React, { useEffect, useRef, useState } from "react";

import { ContextAuth } from "../context/Context";

import { Link } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContextAuth } from "../context/ThemeContext";
import { BsSun } from "react-icons/bs";

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
        <div className="flex justify-center items-center shadow-md h-14 bg-blue-400  rounded-b-xl">
          <div className="flex justify-center items-center">
            <button
              className={`flex justify-center items-center rounded-lg p-2 m-2  fixed top-0 left-2 hover:bg-red-500 ${
                isDarkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
              } `}
            >
              Shutdown
            </button>
          </div>

          <div
            className={`relative text-center pt-1 font-bold text-2xl p-2 ${
              isDarkMode ? " text-black" : " text-gray-800"
            } `}
          >
            Shop Connect
          </div>
          <div className="">
            <button
              className={`rounded-full p-2 m-2  fixed top-2 right-2 ${
                isDarkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
              } `}
              onClick={toggleMode}
            >
              {isDarkMode ? <BsSun className="" /> : <MdOutlineDarkMode />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
