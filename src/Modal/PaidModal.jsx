import React from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContextAuth } from "../context/ThemeContext";
import { ContextAuth } from "../context/Context";

const PaidModal = ({ setPaidModal, data }) => {
  const { paid, setPaid } = ContextAuth();
  const { isDarkMode } = ThemeContextAuth();
  const naviGate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setPaid((paid) => ({
      ...paid,
      [e.target.id]: e.target.value,
    }));
  };
  const PaidAmount = (data, paid) => {
    console.log(paid);
    toast.success(" Price Updated Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: false,
      theme: "light",
    });

    naviGate(`/customer-details/${data}`);
    setPaidModal(false);
  };
  return (
    <>
      <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[100] ">
        <div
          className={
            "relative h-[30vh] w-[80vw] md:w-[30vw]   bg-white rounded-lg md:h-[35vh]"
          }
        >
          <div className="text-end">
            <button
              onClick={() => {
                setPaidModal({ show: false });
              }}
              className=" font-bold text-xl bg-red-600 text-white rounded-full px-2 py-0"
            >
              x
            </button>
          </div>
          <div className="flex justify-center items-center flex-col h-full gap-y-5">
            <p
              className={`font-semibold text-base  ${
                isDarkMode ? "text-black" : "text-black"
              }`}
            >
              <label htmlFor=""> Paid Amount:</label>
              <input
                type="number"
                id="paid"
                value={paid}
                onChange={handleChange}
                className="border-2 border-gray-400 rounded-md w-20"
              />
            </p>
            <div className="flex justify-center items-center gap-x-5">
              <button
                className="font-bold text-xl bg-green-600 text-white py-1.5 px-2 rounded-md w-28"
                onClick={() => PaidAmount(data, paid)}
              >
                Paid
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PaidModal;
