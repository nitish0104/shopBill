import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContextAuth } from "../context/ThemeContext";

const LogoutModal = ({ setModel }) => {
  const { isDarkMode } = ThemeContextAuth();
  const naviGate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: false,
      theme: "light",
    });
    naviGate("/login");
  };
  return (
    <>
      <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[100] ">
        <div
          className={
            "relative h-[25vh] w-[80vw] md:w-[50vw]  bg-white rounded-lg md:h-[50vh]"
          }
        >
        

          <div className="flex justify-center items-center flex-col h-full gap-y-5">
            <p className={`font-semibold text-base ${isDarkMode ? 'text-black' : 'text-black'}`}>Are you sure you want to logout.</p>
            <div className="flex justify-center items-center gap-x-5">
              <button
                onClick={() => {
                  setModel({ show: false });
                }}
                className=" font-bold text-xl bg-blue-600 text-white py-1.5 px-2 rounded-md w-28"
              >
                Cancle
              </button>
              <button className="font-bold text-xl bg-red-600 text-white py-1.5 px-2 rounded-md w-28" onClick={logout}> Yes</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LogoutModal;
