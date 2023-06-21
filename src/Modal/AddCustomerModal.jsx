import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../components/Input/Input";

const AddCustomerModal = ({ data, setModal }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModal({ show: false });
    }, 100); // Wait for the closing animation to complete (300ms)
  };

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");


  return (
    <>
      <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[100] ">
        <div className="relative h-[50vh] w-[90vw] bg-white rounded-lg">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 font-bold text-2xl text-red-600"
          >
            <AiOutlineClose />
          </button>


<div>




          <form
            action=""
            className=" pt-8 px-5 flex flex-col gap-y-6 justify-center h-full "
			>
            <Input
              type={"input"}
              id={"name"}
              Label={"Customer Name"}
              placeholder={"Enter the Customer Name"}
              value={name}
              onChange={(e) => {
				  setName(e.target.value);
				}}
				className={"w-[95%]"}
				/>

            <Input
              type={"number"}
              id={"number"}
              Label={"Customer Number"}
              placeholder={"Enter the Customer Number"}
              value={number}
              onChange={(e) => {
				  setNumber(e.target.value);
				}}
				className={"w-[95%]"}
				/>
<div className="pt-5 flex justify-center items-center">

            <button className="px-3 py-1 bg-blue-500 w-fit rounded-lg text-xl  mx-auto ">Submit</button>
</div>
          </form>
				</div>
        </div>
      </div>
    </>
  );
};

export default AddCustomerModal;
