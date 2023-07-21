import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ThemeContextAuth } from "../context/ThemeContext";
const BillPreviewModal = ({ showModal, setShowModal, billID }) => {
  const { isDarkMode } = ThemeContextAuth();
  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-[500]"></div>
      )}
      {showModal && (
        <section className={`h-[90vh] overflow-y-auto w-[100vw] md:w-[90vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-[1000] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="fixed -top-1  right-3 flex justify-end md:px-5 py-3 text-red-500">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="ml-auto"
            >
              <AiOutlineClose className="text-3xl" />
            </button>
          </div>
          {/* for developement */}
          <div className="lg:py-6 py-8">
            <iframe
              className=" w-full h-[90vh]"
              src={`http://localhost:3000/invoice/${billID}?show=false`}
              frameborder="0"
            ></iframe>
          </div>
          {/* <div className="lg:py-6 py-8">
            <iframe
              className=" w-full h-[90vh]"
              src={`https://cont-o.vercel.app/invoice/${billID}?show=false`}
              frameborder="0"
            ></iframe>
          </div> */}
        </section>
      )}
    </>
  );
};

export default BillPreviewModal;
