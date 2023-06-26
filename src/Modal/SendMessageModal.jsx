import React, { useEffect, useState } from "react";
import "./ModalAnimation.css";
import { CSSTransition } from "react-transition-group";
import { AiOutlineClose } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import UseWhatsapp from "whatsapp-react-component";
const SendMessageModal = ({ setmodal, datamodal }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    mobileNumber: "",
  });

  const { message, mobileNumber } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit function
  const onSubmit = () => {
    // Pass the values to the component
    UseWhatsapp(mobileNumber, message);
  };

  // const onSubmit = () => {
  // 	const phoneNumber = mobileNumber;
  // 	const messages = encodeURIComponent(message);
  // 	const url = `https://wa.me/${phoneNumber}?text=${messages}`;

  // 	window.location.href = url;
  //   };


  // Open the modal when `datamodal` prop changes
  useEffect(() => {
    setShowModal(true);
  }, [datamodal]);

  // Close the modal when `showModal` state changes
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setmodal({ show: false });
    }, 300); // Wait for the closing animation to complete (300ms)
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
          <div className="fixed h-[70vh] overflow-auto w-[90vw] md:w-[30vw] bg-white  rounded-lg flex flex-col shadow-2xl ">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 font-bold text-xl text-red-600"
            >
              <AiOutlineClose />
            </button>

            <div className="flex items-center justify-center text-2xl gap-x-5 pt-8 font-thin">
              <BsWhatsapp className="text-2xl text-[#7ed957] font-semibold"></BsWhatsapp>
              <h1 className="text-center text-[#7ed957] font-semibold"> Send Bill</h1>
            </div>
            <form
              action=""
              className="px-5 mt-5 flex flex-col gap-y-4 justify-center w-full "
              onSubmit={onSubmit}
            >
              <input
                type="number"
                className="w-full rounded-xl h-14 border-2 pl-2 outline-none focus:border-[#7ed957] duration-150 hover:border-black hover:border-opacity-75 focus:shadow-lg "
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={onChange}
                name="mobileNumber"
                required
              />
              <input
                type="text"
                className="w-full rounded-xl h-[35vh] border-2 pl-2 outline-none focus:border-[#7ed957] duration-150 hover:border-black hover:border-opacity-75 focus:shadow-md place-content-start placeholder:fixed placeholder:top-1  placeholder:left-2 "
                placeholder="Bill"
                value={message}
                onChange={onChange}
                name="message"
                required
              />
<div className="w-full flex justify-center">

              <input className="border hover:border-2 px-2 py-1 w-28 rounded-md border-[#7ed957]  hover:bg-green-500 hover:bg-opacity-5 cursor-pointer " type="submit" value="Send" />
</div>
            </form> 


          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default SendMessageModal;
