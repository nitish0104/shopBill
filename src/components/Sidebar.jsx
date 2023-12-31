import React, { useEffect, useRef, useState } from "react";

import { ContextAuth } from "../context/Context";

import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContextAuth } from "../context/ThemeContext";
import { BsSun } from "react-icons/bs";
import { GrPowerShutdown } from "react-icons/gr";
import { toast } from "react-toastify";
import LogoutModal from "../Modal/LogoutModal";
const Sidebar = () => {
  const { isDarkMode, toggleMode } = ThemeContextAuth();
  const { userDetails } = ContextAuth();
  const naviGate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [modal, setModal] = useState({ show: false });
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
    };
  }, []);

  return (
    <>
      {modal.show && <LogoutModal data={modal.show} setModel={setModal} />}
      <div className="relative z-50 backdrop-blur-sm transition duration-300 ease-in-out ">
        {/* <div className=""> */}
        <div
          className={`  ${
            isDarkMode
              ? "bg-gradient-to-t from-blue-700 via-blue-800 to-blue-900  text-black"
              : "bg-blue-400  text-gray-800"
          } flex justify-between items-center shadow-lg h-16   px-4`}
        >
          <button
            onClick={() => {
              setModal({ show: true });
            }}
            className={`flex justify-center items-center rounded-full p-2  bg-red-500 text-sm hover:bg-red-600 text-white`}
          >
            <GrPowerShutdown />
          </button>

          <div
            className={`   font-semibold  text-3xl ${
              isDarkMode ? " text-white" : " text-gray-800"
            } `}
          >
            ShopBill
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
