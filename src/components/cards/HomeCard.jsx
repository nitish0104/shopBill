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
        className={` ${isDarkMode
            ? "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-950 via-blue-950 to-gray-900 text-white "
            : "bg-gray-50 "
          } text-${isDarkMode ? "white" : "gray-800"
          } p-4 rounded-lg  shadow-md  transform  perspective-100  hover:shadow-lg  overflow-hidden border m-2`}
      >
        <div className="flex justify-between items-center gap-x-2 ">
          <p className="font-medium ">Total: Rs {amount - discount}</p>
          <p className="font-medium ">Bill Id: {billId.slice(0, 10)}</p>
        </div>
        <div className=" py-2 flex justify-between items-start  ">
          <div className="w-6/12" onClick={handleCardClick} ref={ref}>
            <button className="flex flex-col   gap-y-3 md:flex-none justify-start">
              <div className="font-semibold text-left ">{name}</div>

              <p className=" font-semibold  ">{mobileNumber}</p>
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
                {/* <p className="text-sm ">Paid:</p> */}
                <p className="font-bold  text-green-500">&#8377;{paid}</p>
              </button>
            ) : (
              <button
                className={"text-center flex gap-x-1 items-center text-xl "}
                onClick={() => {
                  setShowPaid(true);
                }}
              >
                {/* <p className="text-sm ">UnPaid: </p> */}
                <p className="font-bold text-red-500">
                  &#8377;{amount - discount - paid}
                </p>
              </button>
            )}

            <div>
              <div className="text-center font-semibold ">{formattedDate}</div>
              <p className="text-sm text-center">{time}</p>
            </div>
          </div>
        </div>

        <div
          className="w-12/12 bg-green-500 flex justify-center items-center rounded-md hover:bg-green-600 gap-4 cursor-pointer"
          onClick={() => {
            onClick(billId);
          }}
        >
          <button className=" text-white font-bold  p-[9px] rounded-full  flex gap-2 justify-center items-center">
            <BsWhatsapp className=" text-xl text-center "></BsWhatsapp>
            <p className="text-white font-semibold">Send Bill</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerCard;
