import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";

const GetBills = () => {
  const phoneNumber = "9987274285"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message
  const [businessBills, setBusinessBills] = useState('');

  useEffect(() => {
    try {
      axios("https://khatabook-one.vercel.app/getbusinessbill", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setBusinessBills(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleButtonClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const contentRef = useRef(null);
  const cardData = [
    {
      id: 1,
      name: "Nitish  Dalvi",
      mobileNumber: "356428927",
      date: "29/Jun/2023",
      amount: 100,
      items: ["maggi", "oats", "Buscuit"],
    },
    {
      id: 2,
      name: "Prakash Jha",
      mobileNumber: "356428927",
      date: "28/jun/2023",
      amount: 456,
      items: ["kitkat", "milk", "Rice"],
    },
    {
      id: 3,
      name: "XYZ ABC",
      mobileNumber: "356428927",
      date: "10/May/2023",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    {
      id: 4,
      name: "XYZ ABC",
      mobileNumber: "356428927",
      date: "23/may/2022",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    {
      id: 5,
      name: "XYZ ABC",
      mobileNumber: "356428927",
      date: "20/jun/2023",
      amount: 869,
      items: ["Item 1", "milk", "Item 3"],
    },
    // Add more customer objects
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filteredRangeCards = cardData.filter((card) => {
    if (startDate && endDate) {
      const cardDate = card.date;
      return cardDate >= startDate && cardDate <= endDate;
    }
    return true;
  });

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    setSelectedDate("");
  }, [filter]);
  const getMonthAbbreviation = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };
  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const formattedDate = `${date.getDate()}/${getMonthAbbreviation(
      date.getMonth()
    )}/${date.getFullYear()}`;

    setSelectedDate(formattedDate);
  };

  const filteredCards = cardData.filter((card) => {
    const cardDate = new Date(card.date);
    // const selected = new Date(selectedDate);

    if (filter === "today") {
      const today = new Date();
      return cardDate.toDateString() === today.toDateString();
    } else if (filter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return cardDate.toDateString() === yesterday.toDateString();
    } else if (filter === "lastweek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return cardDate >= lastWeek && cardDate <= new Date();
    } else if (filter === "lastmonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return cardDate >= lastMonth && cardDate <= new Date();
    } else if (filter === "lastyear") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      return cardDate >= lastYear && cardDate <= new Date();
    } else {
      return true;
    }
  });

  const filteredCardsByDate = selectedDate
    ? filteredCards.filter(
        (card) => card.date === selectedDate.toString().split("T")[0]
      )
    : filteredCards;



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
                value={filter}
                onChange={handleFilterChange}
                className="px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[35vw]"
              >
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="lastYear">Last Year</option>
              </select>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 ml-2 rounded-lg"
              />
            </div>
            {/* <div className="flex justify-center items-center">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateRangeChange}
                placeholderText="Select date range"
                className="p-2 rounded border-gray-300 border focus:outline-none flex justify-center items-center"
              />
            </div> */}
            <div
              className="  md:grid md:grid-cols-2 md:gap-2 "
              ref={contentRef}
            >
              {filteredCardsByDate.map((customer, index) => (
                <CustomerCard
                  key={customer.id + index}
                  name={customer.name}
                  date={customer.date}
                  amount={customer.amount}
                  items={customer.items}
                  mobileNumber={customer.mobileNumber}
                  div={
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-center "
                      phoneNumber={phoneNumber}
                      message={message}
                      onClick={handleButtonClick}
                    >
                      <BsWhatsapp className="text-2xl"></BsWhatsapp>
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <Navigation />
      </LayoutManin>
    </>
  );
};

export default GetBills;
