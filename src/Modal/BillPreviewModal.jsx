import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const BillPreviewModal = ({ showModal, setShowModal, billID }) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-[500]"></div>
      )}
      {showModal && (
        <section className="h-[90vh] overflow-y-auto w-[100vw] md:w-[90vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[1000]">
          <div className="fixed -top-2  right-5 flex justify-end md:px-5 py-4 text-red-500">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="ml-auto"
            >
              <AiOutlineClose className="text-2xl" />
            </button>
          </div>
          {/* for developement */}
          {/* <div className="lg:py-6 py-8">
          <iframe
            className="border w-full h-[90vh]"
            src={`http://localh:3000/invoice/${billID}?show=false`}
            frameborder="0"
            ></iframe>{" "}
            </div> */}
          <div className="lg:py-6 py-8">
            <iframe
              className="w-full h-full"
              src={`https://cont-o.vercel.app/invoice/${billID}?show=false`}
              frameborder="0"
            ></iframe>
          </div>

        </section>
      )}
    </>
  );
};

export default BillPreviewModal;
