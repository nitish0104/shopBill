import React, { useRef, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import CustomerCard from "../../components/cards/HomeCard";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-modal";
import { AiFillCloseCircle, AiFillFilter } from "react-icons/ai";
import { getYear } from "date-fns";

const GetBills = () => {
  const phoneNumber = "9987274285"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message

  const [date, setDate] = useState(new Date());
  // const years = range(1990, getYear(new Date()) + 1, 1);
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

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
  const data = [
    {
      id: 1,
      name: "Nitish  Dalvi",
      mobileNumber: "356428927",
      date: "2023-06-19",
      amount: 100,
      items: ["maggi", "oats", "Buscuit"],
    },
    {
      id: 2,
      name: "Prakash Jha",
      mobileNumber: "356428927",
      date: "2023-05-19",
      amount: 456,
      items: ["kitkat", "milk", "Rice"],
    },
    {
      id: 3,
      name: "XYZ ABC",
      mobileNumber: "356428927",
      date: "2020-02-19",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    {
      id: 4,
      name: "XYZ ABC",
      mobileNumber: "356428927",
      date: "2020-06-26",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    {
      id: 5,
      name: "XYZ ABC",
      mobileNumber: "356428927",
      date: "2020-06-27",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    // Add more customer objects
  ];

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const filteredData = data.filter((item) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return item.date === formatDate(yesterday);
    } else if (selectedFilter === "lastWeek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return new Date(item.date) >= lastWeek;
    } else if (selectedFilter === "lastMonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return new Date(item.date) >= lastMonth;
    } else if (selectedFilter === "lastYear") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return new Date(item.date) >= lastYear;
    }
    if (selectedDate) {
      filteredData = filteredData.filter(
        (item) => item.date === formatDate(selectedDate)
      );
    }
    return filteredData;
  });

  return (
    <>
      <LayoutManin>
        <Sidebar />
        <div className=" md:w-[70vw] w-[100vw]  flex justify-center items-center  mt-8 mx-auto">
          <div>
            <div className="flex justify-center items-center gap-x-4 mb-4">
              <div className=" text-3xl font-extrabold">
                <AiFillFilter></AiFillFilter>
              </div>
              <select
                id="filter"
                value={selectedFilter}
                onChange={handleFilterChange}
                className="px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[35vw]"
              >
                <option value="all">All</option>
                <option value="yesterday">Yesterday</option>
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastYear">Last Year</option>
              </select>
              {/* <button
                onClick={() => setIsModalOpen(true)}
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Select Date
              </button> */}
              <DatePicker
                selected={date}
                
                onChange={(date) => setDate(date)}
                isClearable
                placeholderText="dd/mm/yyyy"
                dateFormat={'dd/MM/yyyy'}
                className="px-2 outline-none border bg-transparent  py-1.5 md:w-40 shadow-sm shadow-blue-200  border-gray-300 rounded-md w-[40vw]"
              />
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
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="px-2 py-1 border border-gray-900 rounded-md"
                    />

                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mt-4 ml-3"
                    >
                      <AiFillCloseCircle></AiFillCloseCircle>
                    </button>
                  </div>
                </div>
              )}
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
            </div>
          </div>
        </div>
        <Navigation />
      </LayoutManin>
    </>
  );
};

export default GetBills;
