import React, { useRef, useState } from "react";
import LayoutMain from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";
import html2canvas from "html2canvas";
import { Link, useNavigate } from "react-router-dom";
import SendMessageModal from "../../Modal/SendMessageModal";
const GeneratedBill = () => {
  const navigate = useNavigate();
  const [modal, setmodal] = useState({ show: false, datamodal: {} });
  const { isDarkMode } = ThemeContextAuth();
  const contentRef = useRef(null);
  const handleDownload = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "download.png";
      link.click();
    });
  };
  return (
    <>
      <LayoutMain>
        <Sidebar />
        {modal.show && (
          <SendMessageModal
            datamodal={modal.show && modal?.datamodal}
            setmodal={setmodal}
          />
        )}
        <div className="flex justify-center">
          <div className="flex justify-center pt-5 md:w-[80vw] items-center w-full px-4" ref={contentRef}>
            <div className="w-full md:w-2/3">
              <div className="md:px-3 px-0">
                <table
                  className={`border-2 border-b-black  border-collapse w-full rounded-lg ${
                    isDarkMode ? "border-white" : "border-black border-b-black"
                  }`}
                >
                  <thead>
                    <tr className=" py-2  text-center px-3">
                      <th className="py-2 px-4">Item</th>
                      <th className="py-2 px-4">Quantity</th>
                      <th className="py-2 px-4">Total</th>
                      <th className="py-2 px-4">Delete</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div className="fixed bottom-16 pb-4 flex justify-between md:justify-between md:gap-x-20 items-center md:px-28 px-5 z-30 w-screen md:w-2/3">
            <button
              onClick={() => {
                setmodal({ show: true, datamodal: "" });
              }}
              className="bg-green-500 hover:bg-green-600 shadow-xl text-white font-bold py-2 px-3 w-[40vw] md:w-40 rounded mt-4 flex gap-2 justify-center items-center "
            >
              Share <BsWhatsapp className="text-2xl"></BsWhatsapp>
            </button>

            <button
              onClick={handleDownload}
              className="bg-blue-600 w-[40vw] hover:bg-blue-700 md:w-40 shadow-xl text-white font-bold py-2 px-3 rounded mt-4 flex gap-2 justify-center items-center "
            >
              Downlaod{" "}
              <AiOutlineDownload className="text-2xl"></AiOutlineDownload>
            </button>
          </div>
        </div>
        <Navigation />
      </LayoutMain>
    </>
  );
};

export default GeneratedBill;
