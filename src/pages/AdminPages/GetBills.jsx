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
import { format, formatISO9075 } from "date-fns";
import { ContextAuth } from "../../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../../components/Spinner";

const GetBills = () => {
  const { allCustomer } = ContextAuth();
  // const phoneNumber = "9819094281"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message
  const [businessBills, setBusinessBills] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    try {
      axios("https://khatabook-one.vercel.app/getbusinessbill", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setBusinessBills(res.data);
          setLoading(false)
          console.log("Generate bill ", res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleButtonClick = (phoneNumber) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const contentRef = useRef(null);
  // const cardData = [
  //   {
  //     id: 1,
  //     name: "Nitish  Dalvi",
  //     mobileNumber: "356428927",
  //     date: "29/Jun/2023",
  //     amount: 100,
  //     items: ["maggi", "oats", "Buscuit"],
  //   },
  //   {
  //     id: 2,
  //     name: "Prakash Jha",
  //     mobileNumber: "356428927",
  //     date: "28/jun/2023",
  //     amount: 456,
  //     items: ["kitkat", "milk", "Rice"],
  //   },
  //   {
  //     id: 3,
  //     name: "XYZ ABC",
  //     mobileNumber: "356428927",
  //     date: "10/May/2023",
  //     amount: 869,
  //     items: ["Item 1", "milk", "Item 3"],
  //   },
  //   {
  //     id: 4,
  //     name: "XYZ ABC",
  //     mobileNumber: "356428927",
  //     date: "23/may/2022",
  //     amount: 869,
  //     items: ["Item 1", "milk", "Item 3"],
  //   },
  //   {
  //     id: 5,
  //     name: "XYZ ABC",
  //     mobileNumber: "356428927",
  //     date: "20/jun/2023",
  //     amount: 869,
  //     items: ["Item 1", "milk", "Item 3"],
  //   },
  //   // Add more customer objects
  // ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // const filteredRangeCards = cardData.filter((card) => {
  //   if (startDate && endDate) {
  //     const cardDate = card.date;
  //     return cardDate >= startDate && cardDate <= endDate;
  //   }
  //   return true;
  // });

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

  // const filteredCards = cardData.filter((card) => {
  //   const cardDate = new Date(card.date);
  //   // const selected = new Date(selectedDate);

  //   if (filter === "today") {
  //     const today = new Date();
  //     return cardDate.toDateString() === today.toDateString();
  //   } else if (filter === "yesterday") {
  //     const yesterday = new Date();
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     return cardDate.toDateString() === yesterday.toDateString();
  //   } else if (filter === "lastweek") {
  //     const lastWeek = new Date();
  //     lastWeek.setDate(lastWeek.getDate() - 7);
  //     return cardDate >= lastWeek && cardDate <= new Date();
  //   } else if (filter === "lastmonth") {
  //     const lastMonth = new Date();
  //     lastMonth.setMonth(lastMonth.getMonth() - 1);
  //     return cardDate >= lastMonth && cardDate <= new Date();
  //   } else if (filter === "lastyear") {
  //     const lastYear = new Date();
  //     lastYear.setFullYear(lastYear.getFullYear() - 1);
  //     return cardDate >= lastYear && cardDate <= new Date();
  //   } else {
  //     return true;
  //   }
  // });

  // const filteredCardsByDate = selectedDate
  //   ? filteredCards.filter(
  //       (card) => card.date === selectedDate.toString().split("T")[0]
  //     )
  //   : filteredCards;

  useEffect(() => {
    AOS.init();
  }, []);
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

{
!loading ? (  <div
  className="  md:grid md:grid-cols-2 md:gap-2 "
  ref={contentRef}
  data-aos="flip-right"
>
  {/* {allCustomer.map((value, index) => {
    return (
      <div key={index}>
        {value?.customerName}
        <div>{value?.customerNumber}</div>
      </div>
    );
  })} */}
  {allCustomer.map((customer, index) => (
    <CustomerCard
      key={customer._id + index}
      name={customer.customerName}
      date={customer.date}
      amount={customer.amount}
      id={customer._id}
      // items={customer.items}
      mobileNumber={customer.customerNumber}
      div={
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-center "
          phoneNumber={customer.customerNumber}
          message={message}
          onClick={() => {
            handleButtonClick(customer.customerNumber);
          }}
        >
          <BsWhatsapp className="text-2xl"></BsWhatsapp>
        </button>
      }
    />
  ))}
</div>) : (

  <span className="flex justify-center items-center h-[60vh]">

  <svg
  aria-hidden="true"
  className="w-20 h-20 text-white animate-spin fill-blue-600 " 
  viewBox="0 0 100 101"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    fill="currentColor"
    />
  <path
    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    fill="currentFill"
  />
</svg>
    </span>


)

}

          
          </div>
        </div>
        <Navigation />
      </LayoutManin>
    </>
  );
};

export default GetBills;
