import React, { useState } from "react";
import Modal from "../Modal/CustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";

const CustomerCard = ({ name, date, mobileNumber, amount, items }) => {
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
      <div
        className={`bg-${isDarkMode ? "blue-200" : "cyan-50"} text-${
          isDarkMode ? "white" : "gray-800"
        } p-4 rounded-lg  shadow-md shadow-blue-300 transform  perspective-100  w-[100%]  overflow-hidden border mx-2 my-2`}
      >
        <div className=" py-4 flex justify-between items-center gap-x-4">
          <div className="text-start">
            <button onClick={handleCardClick}>
              <div className="font-bold text-xl mb-2">{name}</div>

              <p className=" font-semibold mb-2 text-start">{mobileNumber}</p>
            </button>
          </div>
          <div className="flex-col">
            <p
              className={`text-3xl text-center mb-2 font-bold  ${
                isChecked ? "text-red-500" : "text-green-600"
              }`}
            >
              &#8377;{amount}
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="ml-2"
              />
            </p>
            <div className="flex-col items-center">
              {/* <input type="checkbox" className="form-checkbox" /> */}
              {/* <div>
                <span>Pending</span>
              </div> */}
            </div>
            <div>
              <div>{date}</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Purchased Items</h2>

          <ul>
            {items.map((item, index) => (
              <li className="text-lg text text-center text-black" key={index}>
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
