import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const AddItemModal = () => {
	const [showModal, setShowModal] = useState(false);
	const closeModal = () => {
	  setShowModal(false);
	  setTimeout(() => {
		setModal({ show: false });
	  }, 100); // Wait for the closing animation to complete (300ms)
	};
  
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

		  </div>
		  </div>
	</>
  )
}

export default AddItemModal