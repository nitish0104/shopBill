import React, { useState } from "react";
import Modal from "../Modal/CustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";

const CustomerCard = ({ name, date, amount, items }) => {
  const { isDarkMode } = ThemeContextAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <div className=" shadow-blue-500/50   bg-blue-200  "> */}
      <div
        className={`bg-${isDarkMode ? "blue-200" : "cyan-50"} text-${
          isDarkMode ? "black" : "gray-800"
        } p-4 rounded-lg  shadow-md transform  perspective-100  max-w-sm  overflow-hidden border mx-4 my-3`}
      >
        <div className="px-8 py-4 flex justify-between items-center">
          <div>
            <button onClick={handleCardClick}>
              <div className="font-bold text-xl mb-2">{name}</div>

              <p className="text-gray-800 font-semibold mb-2 text-center">
                {date}
              </p>
            </button>
          </div>
          <div>
            <p
              className={`text-3xl text-center mb-2 font-bold  ${
                isChecked ? "text-red-500" : "text-green-600"
              }`}
            >
              &#8377;{amount}
            </p>
            <div className="flex items-center">
              {/* <input type="checkbox" className="form-checkbox" /> */}
              <span>Pending</span>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="ml-2"
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Purchased Items</h2>

          <ul>
            {items.map((item, index) => (
              <li className="text-lg text text-center" key={index}>
                {item}
              </li>
            ))}
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Edit Items
          </button>
        </Modal>
      )}
    </>
  );
};

export default CustomerCard;

{
  /* <div className="px-6 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCardClick}
        >
          View Details
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Purchased Items</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Edit Items
          </button>
        </Modal>
      )} */
}
