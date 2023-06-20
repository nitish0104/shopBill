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

const Sidebar = () => {
  const { isDarkMode, toggleMode } = ThemeContextAuth();

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { profile } = ContextAuth();

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
    };
  }, []);

  console.log(profile);
  console.log(profile.BusinessName);
  return (
    <>
      <div className="relative z-50 backdrop-blur-sm transition duration-300 ease-in-out ">
        <div className="flex justify-center items-center shadow-md h-14 bg-blue-300  rounded-b-xl">
          <div>
            <button
              className="fixed top-0 left-0 z-50 pt-1 text-2xl text-white rounded-md"
              onClick={toggleSidebar}
            >
              {isOpen ? (
                <HiX
                  className={`rounded-full p-2 font-bold text-5xl ${
                    isDarkMode ? " text-white" : "text-black "
                  } `}
                />
              ) : (
                <HiMenu
                  className={`rounded-full p-2 font-bold text-5xl ${
                    isDarkMode ? " text-white" : "text-black"
                  } `}
                />
              )}
            </button>
          </div>

          {/* <div className=" "> */}
          <div
            className={`relative text-center pt-1 font-bold text-2xl p-2${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            } `}
          >
            {profile.BusinessName ? profile.BusinessName : "Business Name"}
          </div>
          <div className="">
            <button
              className={`rounded-full p-2 m-2  fixed top-2 right-2 ${
                isDarkMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
              } `}
              onClick={toggleMode}
            >
              {isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
            </button>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition-all duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div
            className={`fixed top-0 left-0  w-screen h-screen  rounded-t-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } `}
            ref={sidebarRef}
          >
            <div className="pt-10">
              <FaUserCircle
                size={100}
                className={`mx-auto ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                } `}
              />
              <div className="flex items-center p-4">
                <AiOutlineShop className="text-2xl text-accent" />
                <p className="block    px-3 py-2 rounded-md text-xl font-medium transition duration-300 ease-in-out">
                  {profile.BusinessName
                    ? profile.BusinessName
                    : "Business Name"}
                </p>
              </div>

              <div className="flex items-center p-4">
                <IoBusinessOutline className="text-2xl text-accent" />
                <p className="block   px-3 py-2 rounded-md text-xl font-medium transition duration-300 ease-in-out">
                  {profile.BusinessType
                    ? profile.BusinessType
                    : "Business Type"}
                </p>
              </div>
              <div className="flex items-center p-4">
                <HiOutlineReceiptTax className="text-2xl text-accent" />
                <p className="block   px-3 py-2 rounded-md text-xl font-medium transition duration-300 ease-in-out">
                  {profile.gstNo ? profile.gstNo : "Gst Number"}
                </p>
              </div>
              <div className="absolute bottom-12 w-[70vw]">
                <div className="flex gap-x-10 justify-center  items-center ">
                  <Link
                    to={"/profile"}
                    className="block  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                  >
                    Edit Proile
                  </Link>
                  <button className="block text-white bg-red-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default Sidebar;
