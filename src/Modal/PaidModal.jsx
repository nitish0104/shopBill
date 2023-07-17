import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContextAuth } from "../context/ThemeContext";
import { ContextAuth } from "../context/Context";
import axios from "axios";
import Spinner from '../components/Spinner'
const PaidModal = ({ setPaidModal, data, billData }) => {
  const { paid, setPaid, savePaid } = ContextAuth();
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = ThemeContextAuth();
  const naviGate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setPaid(() => ({
      [e.target.id]: e.target.value,
    }));
  };

  const PaidAmount = async (id) => {
    try {
      setLoading(true)
      await axios(`https://khatabook-one.vercel.app/updatebill/${id}`, {
        method: "PATCH",
        data: {
          paid: billData?.paid + paid,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        toast.success(res?.data?.messaage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: false,
          theme: "light",
        });
        if (!res.data.error) {
          window.location.reload();
        }
        setLoading(false)
      });
    } catch (error) {
      setLoading(false)
    }
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
                onChange={(e) => {
                  let finalAmount = billData?.grandtotal - billData?.discount;
                  let paidValue = Number(e.target.value) + billData?.paid;
                  if (finalAmount >= paidValue) {
                    setPaid(Number(e.target.value));
                  }
                }}
                className="border-2 border-gray-400 rounded-md w-20 text-black"
              />
            </p>
            <div className="flex justify-center items-center gap-x-5">
              <button
                className="font-bold text-xl bg-green-600 text-white py-1.5 px-2 rounded-md w-28 flex justify-center items-center"
                onClick={() => PaidAmount(data)}
              >
                {!loading ? 'Paid' : <Spinner/>}
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
