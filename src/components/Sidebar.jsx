import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-gray-900 text-black transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar content */}
        <button
          className="absolute top-0 right-0 m-4 text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          Close
        </button>
        <ul className="p-4">
          <li className="my-2">Menu Item 1</li>
          <li className="my-2">Menu Item 2</li>
          <li className="my-2">Menu Item 3</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
