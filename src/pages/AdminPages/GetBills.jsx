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
import { parse, parseISO, subWeeks } from "date-fns";
import axios from "axios";
import { format } from "date-fns";
import { ContextAuth } from "../../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../../components/Spinner";
import PageLoader from "../../components/PageLoader";
import { subDays, subMonths, subYears } from "date-fns";

const GetBills = () => {
  const { allCustomer } = ContextAuth();
  // const phoneNumber = "9819094281"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message
  const [businessBills, setBusinessBills] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      axios("https://khatabook-one.vercel.app/getbusinessbill", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setBusinessBills(res.data);
          setLoading(false);
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

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedDate(null);
  };
  const handleDateChange = (e) => {
    const selected = parse(e.target.value, "yyyy-MM-dd", new Date());
    const formattedDate = format(selected, "dd MMM yyyy");
    setSelectedDate(formattedDate);
    console.log(formattedDate);
  };

  const filteredCards = allCustomer.filter((card) => {
    const cardDate = format(new Date(card?.createdAt), "dd MMM yyyy");
    console.log(cardDate);

    if (filter === "today") {
      const today = format(new Date(), "dd MMM yyyy");
      return cardDate === today;
    } else if (filter === "yesterday") {
      const yesterday = format(subDays(new Date(), 1), "dd MMM yyyy");
      return cardDate === yesterday;
    } else if (filter === "lastweek") {
      const lastWeek = format(subWeeks(new Date(), 1), "dd MMM yyyy");
      return cardDate >= lastWeek && cardDate <= new Date();
    } else if (filter === "lastmonth") {
      const lastMonth = format(subMonths(new Date(), 1), "dd MMM yyyy");
      return cardDate >= lastMonth && cardDate <= new Date();
    } else if (filter === "lastyear") {
      const lastYear = format(subYears(new Date(), 1), "dd MMM yyyy");
      return cardDate >= lastYear && cardDate <= new Date();
    } else {
      return true;
    }
  });

  const filteredCardsByDate = selectedDate
    ? allCustomer.filter((card) => card.date === selectedDate)
    : filteredCards;

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <LayoutManin>
        <Sidebar />
        <div className=" md:w-[70vw] w-[100vw]  flex justify-center items-center  my-9 mx-auto">
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

            {!loading ? (
              <div
                className="  md:grid md:grid-cols-2 md:gap-2 "
                ref={contentRef}
                data-aos="flip-right"
              >
                {filteredCardsByDate.map((customer, index) => (
                  <CustomerCard
                    key={customer._id + index}
                    name={customer.customerName}
                    date={format(new Date(customer?.createdAt), "dd/MMM/yyyy")}
                    amount={customer.grandtotal}
                    id={customer._id}
                    // items={customer.items}
                    mobileNumber={customer.customerNumber}
                    grandTotal={customer?.grandtotal}
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
              </div>
            ) : (
              <PageLoader className={"h-[60vh]"} />
            )}
          </div>
        </div>
        <Navigation />
      </LayoutManin>
    </>
  );
};

export default GetBills;
