import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../components/Input/Input";
import { ThemeContextAuth } from "../../context/ThemeContext";
import {
  AiFillFilter,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShop,
} from "react-icons/ai";
import { BsShare, BsWhatsapp } from "react-icons/bs";
import "./ShowCustomerDetail.css";

const ShowCustomerDetails = () => {
  const [customerName, setCustomername] = useState("");
  const { isDarkMode } = ThemeContextAuth();
  const [date, setDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState(null);
  const toggle = (e) => {
    if (selected === e) {
      return setSelected(null);
    }

    setSelected(e);
  };

  const phoneNumber = "9987274285"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message

  const handleButtonClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const data = [
    {
      date: "26/06/2023",
      items: ["maggi", "oats", "Buscuit"],
      individualPrice: [10, 10, 10],
      quantity: [2, 3, 4],
      total: [20, 30, 40],
      grandTotal: 90,
    },

    {
      date: "27/06/2023",
      items: ["egg", "dall", "Biscuit"],
      individualPrice: [5, 10, 10],
      quantity: [1, 1, 2],
      total: [5, 10, 20],
      grandTotal: 35,
    },
  ];

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
    return `${day}-${month}-${year}`;
  };
  const filteredData = data.filter((item) => {
    if (selectedFilter === "all") {
      return true;
    } else if (selectedFilter === "today") {
      const today = new Date();
      today.setDate(today.getDate());
      return item.date === formatDate(today);
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
        <div>
          <div className="text-xl flex gap-y-2  justify-center items-center pt-4 flex-col">
            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Customer Name
              </label>

              <input
                className="pl-2 flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="name"
                type="text"
                name="name"
                value={"Nitish Dalvi"}
              />
            </div>
            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Customer Number
              </label>

              <input
                className="pl-2 flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="number"
                type="text"
                name="name"
                value={"8888888888"}
              />
            </div>
          </div>

          <div className="flex justify-center items-center pt-4">
            <h1 className=" text-2xl w-fit px-6 text-white font-semibold py-1.5 rounded-lg bg-green-500">
              Bills
            </h1>
          </div>

          <div className="flex justify-center items-center gap-x-4  pt-4">
            <select
              id="filter"
              value={selectedFilter}
              onChange={handleFilterChange}
              className="outline-none px-2 py-2 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[45vw]"
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </select>

            {/* <ReactDatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              isClearable
              placeholderText="dd/mm/yyyy"
              dateFormat={"dd/MM/yyyy"}
              className="px-2 outline-none border bg-transparent  py-1.5 md:w-40 shadow-sm shadow-blue-200  border-gray-300 rounded-md w-[40vw]"
            /> */}

            <input
              type="date"
              className="outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[45vw]"
            />
          </div>

          <div className="overflow-x-scroll px-4 pt-4 flex flex-col gap-y-6 items-center">
            {data?.map((value, index) => {
              return (
                <div key={index}>
                  <div
                    className="pb-2 px-1 "
                    onClick={() => {
                      toggle(index);
                    }}
                  >
                    <div
                      className={`${
                        selected === index
                          ? "flex justify-between items-center border p-2"
                          : "flex justify-between items-center  border border-black p-2"
                      } `}
                    >
                      <p>Date: {value?.date}</p>
                      <p>Grand Total: {value?.grandTotal}</p>
                      {/* <button
                      className="  font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-center "
                      phoneNumber={phoneNumber}
                      message={message}
                      onClick={handleButtonClick}
					  >
                      <BsShare className="text-xl"></BsShare>
                    </button> */}
                      <button className="  font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-center ">
                        {/* <AiOutlinePlus className="text-xl"></AiOutlinePlus> */}

                        {selected === index ? (
                          <AiOutlineMinus className="text-xl"></AiOutlineMinus>
                        ) : (
                          <AiOutlinePlus className="text-xl"></AiOutlinePlus>
                        )}
                      </button>
                    </div>
                  </div>

                  <div
                    className={`${
                      selected === index
                        ? "cursor-pointer block h-auto max-h-full  "
                        : "max-h-0 overflow-hidden cursor-pointer"
                    }  `}
                  >
                    <table
                      className={`min-w-full divide-y divide-gray-200" border-2 border-b-black p-2  border-collapse rounded-lg ${
                        isDarkMode
                          ? "border-white"
                          : "border-black border-b-black"
                      }`}
                    >
                      <thead>
                        <tr className="  border-b-2 py-2  text-center">
                          <th className=" bg-white py-2 px-4  ">Item</th>
                          <th className=" bg-white py-2 px-4 ">Quantity</th>
                          <th className=" bg-white py-2 px-4 ">Individual</th>
                          <th className=" bg-white py-2 px-4 ">Total</th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200 flex">
                        <div>
                          <tr className=" border-b-2 py-2 border-black text-x text-center flex flex-col ">
                            {value.items?.map((value, index) => {
                              return (
                                <td
                                  className=" bg-white py-2 px-4 border whitespace-nowrap"
                                  key={index}
                                >
                                  {value}
                                </td>
                              );
                            })}
                          </tr>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LayoutManin>
    </>
  );
};

export default ShowCustomerDetails;
