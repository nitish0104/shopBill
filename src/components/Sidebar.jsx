import React, { useEffect, useRef, useState } from "react";

import { Transition } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";
import { ContextAuth } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import { IoBusinessOutline } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
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
        <div className="flex justify-center items-center shadow-md h-14 bg-blue-300  rounded-b-xl">
          <div className="">
            <button
              className=" w-10 h-10 rounded-full fixed top-2 left-0  focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className={`text-cyan-300    ${
                  isOpenMenu ? "animate-spin" : ""
                }     ${isDarkMode ? " text-white" : "text-black "} `}
                viewBox="0 0 24 24"
                style={{ color: "red" }}
              >
                <circle cx="12" cy="6.5" r="1.5" color="blue" />

                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="17.5" r="1.5" />
              </svg>
            </button>

            <div
              className={`absolute z-10 ${
                isOpenMenu ? "block" : "hidden"
              } mt-2 left-2 top-14 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition ease-out duration-200 transform`}
            >
              <div
                className=" "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button className="block text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out w-fit">
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div
            className={`relative text-center pt-1 font-bold text-2xl p-2${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
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
