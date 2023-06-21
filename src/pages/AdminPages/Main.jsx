import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomerCard from "../../components/cards/HomeCard";
import { ContextAuth } from "../../context/Context";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineShop } from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import Input from "../../components/Input";

const Main = () => {
  const { profile } = ContextAuth();
  const { isDarkMode, toggleMode } = ThemeContextAuth();
  const [readOnly, setReadOnly] = useState(true);
  const customers = [
    {
      id: 1,
      name: "Nitish  Dalvi",
      date: "2023-06-19",
      amount: 100,
      items: ["maggi", "oats", "Buscuit"],
    },
    {
      id: 1,
      name: "Prakash Jha",
      date: "2023-05-19",
      amount: 456,
      items: ["kitkat", "milk", "Rice"],
    },
    {
      id: 1,
      name: "XYZ ABC",
      date: "2020-06-19",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    // Add more customer objects
  ];
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredData = () => {
    if (filter === "all") {
      return customers;
    } else if (filter === "lastWeek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return customers.filter(
        (customer) => new Date(customer.date) >= lastWeek
      );
    } else if (filter === "lastMonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return customers.filter(
        (customer) => new Date(customer.date) >= lastMonth
      );
    } else if (filter === "lastYear") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return customers.filter(
        (customer) => new Date(customer.date) >= lastYear
      );
    } else if (filter === "selectDate" && selectedDate) {
      return customers.filter(
        (customer) =>
          new Date(customer.date).toDateString() === selectedDate.toDateString()
      );
    }
    return [];
  };

  return (
    <>
      <LayoutManin>
        {/* <div className=" mx-auto mt-8">
          <div className="flex justify-around items-center mb-4"> */}
        {/* <div className="text-blue-400 text-xl font-medium">Select Date</div> */}
        {/* <select
              className="px-2 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black shadow-lg w-[90vw] h-12"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
              <option value="selectDate">Select Date</option>
              </select>
            {filter === "selectDate" && (
              <DatePicker
                className="ml-4 px-4 py-2 rounded-md border-2 border-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Date"
                />
            )}
          </div> */}
        {/* <div className="  flex-col  justify-center items-center ">
            {filteredData().map((customer, index) => (
              <CustomerCard
                key={customer.id + index}
                name={customer.name}
                date={customer.date}
                amount={customer.amount}
                items={customer.items}
              />
            ))}
          </div>
        </div> */}

        <div
          className={` overflow-hidden w-screen min-h-screen h-fit  rounded-t-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } `}
        >
          <Sidebar />
          <div className="pt-10">
            <FaUserCircle
              size={100}
              className={`mx-auto ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } `}
            />
            <div className="flex items-center pt-4 gap-x-2 justify-center">
              <AiOutlineShop className="text-2xl" />

              <Input
                className={"font-medium text-xl"}
                readOnly={readOnly}
                value={
                  profile.BusinessName ? profile.BusinessName : "Business Name"
                }
              />
            </div>

            <div className="flex items-center pt-4 justify-center gap-x-2">
              <IoBusinessOutline className="text-2xl " />

              <Input
                readOnly={readOnly}
                className={"font-medium text-xl"}
                value={
                  profile.BusinessType ? profile.BusinessType : "Business Type"
                }
              />

              {/* {profile.BusinessType
                    ? profile.BusinessType
                    : "Business Type"} */}
            </div>
            <div className="flex items-center pt-4 gap-x-2 justify-center">
              <HiOutlineReceiptTax className="text-2xl " />

              <Input
                readOnly={readOnly}
                className={"font-medium text-xl"}
                value={profile.gstNo ? profile.gstNo : "Gst Number"}
              />
            </div>
            <div className=" mt-14 ">
              <div className="flex gap-x-10 justify-center  items-center ">
                <button
                  onClick={() => {
                    setReadOnly(!readOnly);
                  }}
                  className={`block  text-white w-28 px-3 py-2 rounded-md drop-shadow-xl text-base font-semibold transition duration-200 ease-in-out ${
                    !readOnly ? "bg-accent" : "bg-blue-600"
                  }`}
                >
                  {!readOnly ? "Save" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Navigation />
      </LayoutManin>
    </>
  );
};

export default Main;
