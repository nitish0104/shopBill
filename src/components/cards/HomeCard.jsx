import React, { useState } from "react";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
function formatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options);
}
const CustomerCard = ({
  name,
  date,
  mobileNumber,
  amount,
  items,
  div,
  ref,
  id,
  time,
  discount,
  paid,
  unPaid,
  onClick,
  billId,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = ThemeContextAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorChange, setcolorChange] = useState(false);
  const [showPaid, setShowPaid] = useState(true);

  const handleColorChange = () => {
    setcolorChange(!colorChange);
  };
  const handleCardClick = () => {
    // setIsModalOpen(true);
    navigate(`/customer-details/${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const formattedDate = formatDate(date);

  return (
    <>
      <div
        className={`bg-${isDarkMode ? "blue-200" : "cyan-50"} text-${
          isDarkMode ? "white" : "gray-800"
        } p-4 rounded-lg  shadow-md shadow-blue-300 transform  perspective-100    overflow-hidden border m-2`}
      >
        <div className=" py-4 flex justify-between items-start " ref={ref}>
          <div className="text-start w-6/12">
            <button
              onClick={handleCardClick}
              className="flex flex-col  items-start gap-y-3 md:flex-none"
            >
              <div className="font-bold text-xl ">{name}</div>

              <p className=" font-semibold  text-start">{mobileNumber}</p>
            </button>
          </div>
          <div
            className="w-1/12"
            onClick={() => {
              onClick(billId);
            }}
          >
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold  p-[9px] rounded-full  flex gap-2 justify-center items-center">
              <BsWhatsapp className=" text-2xl text-center "></BsWhatsapp>
            </button>
          </div>
          <div className="flex flex-col gap-y-3 justify-center items-end w-6/12">
            {showPaid ? (
              <button
                // className="text-3xl text-center mb-2 font-bold text-green-500"
                className={`text-center flex gap-x-1 items-center text-xl  `}
                onClick={() => {
                  setShowPaid(false);
                }}
              >
                <p className="text-sm ">Paid:</p>{" "}
                <p className="font-bold  text-green-500">
                  &#8377;{paid}
                </p>
              </button>
            ) : (
              <button
                className={"text-center flex gap-x-1 items-center text-xl "}
                onClick={() => {
                  setShowPaid(true);
                }}
              >
                <p className="text-sm ">UnPaid: </p>
                <p className="font-bold text-red-500">&#8377;{amount -discount- paid}</p>
              </button>
            )}

            <div>
              <div className="text-center font-semibold ">{formattedDate}</div>
              <p className="text-sm text-center">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerCard;
