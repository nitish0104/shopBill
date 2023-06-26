import React, { useRef, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import CustomerCard from "../../components/cards/HomeCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-modal";
import { AiFillFilter } from "react-icons/ai";

const dataArray = [
  {
    id: 1,
    name: "Nitish  Dalvi",
    mobileNumber: "356428927",
    date: "2023-06-19",
    amount: 100,
    items: ["maggi", "oats", "Buscuit"],
  },
  {
    id: 1,
    name: "Prakash Jha",
    mobileNumber: "356428927",
    date: "2023-05-19",
    amount: 456,
    items: ["kitkat", "milk", "Rice"],
  },
  {
    id: 1,
    name: "XYZ ABC",
    mobileNumber: "356428927",
    date: "2020-06-19",
    amount: 869,
    items: ["Item 1", "milk", "Item 3"],
  },
  // Add more customer objects
];

// Helper function to filter data based on selected option
const filterData = (selectedOption) => {
  const currentDate = new Date();
  switch (selectedOption) {
    case "all":
      return dataArray;
    case "yesterday":
      currentDate.setDate(currentDate.getDate() - 1);
      return dataArray.filter(
        (data) => data.date === currentDate.toISOString().slice(0, 10)
      );
    case "lastWeek":
      currentDate.setDate(currentDate.getDate() - 7);
      return dataArray.filter((data) => new Date(data.date) >= currentDate);
    case "lastMonth":
      currentDate.setMonth(currentDate.getMonth() - 1);
      return dataArray.filter((data) => new Date(data.date) >= currentDate);
    case "lastYear":
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      return dataArray.filter((data) => new Date(data.date) >= currentDate);
    default:
      return [];
  }
};
const GetBills = () => {
  const phoneNumber = "9987274285"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message

  const handleButtonClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };
  const handleDownload = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "download.png";
      link.click();
    });
  };

  const contentRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const filteredData = filterData(selectedOption);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // const handleDateSelect = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleModalClose = () => {
  //   setModalIsOpen(false);
  // };

  // const handleSelectDate = () => {
  //   setModalIsOpen(true);
  // };

  // const handleDateSubmit = () => {
  //   console.log(selectedDate);
  //   setModalIsOpen(false);
  // };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log(date);
    setModalOpen(false);
  };

  // const [filter, setFilter] = useState("all");
  // const [selectedDate, setSelectedDate] = useState(null);

  // const handleFilterChange = (event) => {
  //   setFilter(event.target.value);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
    <>
      <LayoutManin>
        <Sidebar />
        <div className="md:w-[70vw] w-[100vw]  flex justify-center items-center  mt-8 mx-auto">
          <div>
            <div className="flex justify-center items-center mb-4">
              <div className=" text-3xl font-extrabold">
                <AiFillFilter></AiFillFilter>
              </div>
              <select
                id="filterOption"
                className="border border-gray-300 px-2 py-1 rounded"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="all">All</option>
                <option value="yesterday">Yesterday</option>
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastYear">Last Year</option>
              </select>
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                onClick={handleOpenModal}
              >
                Select Date
              </button>
            </div>
            <div
              className="  w-full md:grid md:grid-cols-2 md:gap-2 "
              ref={contentRef}
            >
              {filteredData.map((customer, index) => (
                <CustomerCard
                  key={customer.id + index}
                  name={customer.name}
                  date={customer.date}
                  amount={customer.amount}
                  items={customer.items}
                  mobileNumber={customer.mobileNumber}
                  div={
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 flex gap-2 justify-center items-center "
                      phoneNumber={phoneNumber}
                      message={message}
                      onClick={handleButtonClick}
                    >
                      <BsWhatsapp className="text-2xl"></BsWhatsapp>
                    </button>
                  }
                />
              ))}
              {/* <div className="w-[50%] h-[60%] ">
                <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>  
                  <DatePicker
                    className="border-2 border-black"
                    selected={selectedDate}
                    onChange={handleDateSelect}
                    dateFormat="yyyy-MM-dd"
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
                    onClick={handleDateSubmit}
                  >
                    Submit
                  </button>
                </Modal>
              </div> */}
              {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                  <div className="bg-white rounded-lg p-4">
                    <DatePicker
                      className="border-2 border-black"
                      selected={selectedDate}
                      onChange={handleDateSelect}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mt-4"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Navigation />
      </LayoutManin>
    </>
  );
};

export default GetBills;
