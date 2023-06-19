import React from "react";

const CustomerModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        {children}
        <button
          className="text-gray-600 hover:text-gray-800  top-0 right-2 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomerModal;
