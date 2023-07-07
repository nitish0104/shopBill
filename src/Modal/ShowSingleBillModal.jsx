import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./ModalAnimation.css";
import { CSSTransition } from "react-transition-group";
const ShowSingleBillModal = ({ setmodal, data }) => {
	const [showModal, setShowModal] = useState(false);
	
  // Open the modal when `datamodal` prop changes
  useEffect(() => {
    setShowModal(true);
  }, [data]);

  // Close the modal when `showModal` state changes
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setmodal({ show: false });
    }, 50); // Wait for the closing animation to complete (300ms)
  };

  return (
    <>
      <CSSTransition
        in={showModal}
        classNames="modal"
        timeout={300}
        unmountOnExit
      >
        <div className="h-screen w-screen bg-[#343434] bg-opacity-50 flex items-center justify-center fixed left-0 top-0 z-[100]">
          <div className="fixed min-h-[85vh] h-fit overflow-auto w-screen md:w-[30vw] bg-white  rounded-lg flex flex-col shadow-2xl ">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 font-bold text-xl text-red-600"
            >
              <AiOutlineClose />
            </button>

<div>
	
</div>

          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ShowSingleBillModal;
