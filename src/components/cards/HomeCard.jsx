import React, { useState } from "react";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
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
  billId
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = ThemeContextAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorChange, setcolorChange] = useState(false);
  const [showPaid, setShowPaid] = useState(true);
  const [showUnPaid, setShowUnPaid] = useState(false);

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
          <div>
            <button onClick={() => {onClick(billId)}}>Whatsapp</button>
          </div>
          <div className="flex flex-col gap-y-3 justify-center items-end w-6/12">
            {showPaid ? (
              <button
                // className="text-3xl text-center mb-2 font-bold text-green-500"
                className={`text-center  font-bold text-xl text-green-500  `}
                onClick={() => {
                  setShowPaid(false);
                }}
              >
                &#8377;{paid > 0 ? paid : amount}
              </button>
            ) : (
              <button
                // className="text-3xl text-center mb-2 font-bold text-green-500"
                className={"text-center  font-bold text-xl text-red-500"}
                onClick={() => {
                  setShowPaid(true);
                }}
              >
                &#8377;{unPaid}
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
