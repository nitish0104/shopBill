import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import CustomerCard from "../../components/cards/HomeCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const GetBills = () => {
  const customers = [
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
        <Sidebar />
        <div className="md:w-[70vw] w-[90vw]  mx-auto mt-8">
          <div className="flex justify-around items-center mb-4">
            <div className="text-blue-400 text-xl font-medium">Select Date</div>
            <select
              className="px-2 py-2 text-black rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="ml-4 px-4 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
              />
            )}
          </div>
          <div className="  w-full md:grid md:grid-cols-2 md:gap-2 ">
            {filteredData().map((customer, index) => (
              <CustomerCard
                key={customer.id + index}
                name={customer.name}
                date={customer.date}
                amount={customer.amount}
                items={customer.items}
                mobileNumber={customer.mobileNumber}
              />
            ))}
          </div>
        </div>
        <Navigation />
      </LayoutManin>
    </>
  );
};

export default GetBills;
