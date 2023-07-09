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
import moment from "moment";

const GetBills = () => {
  const { allCustomer } = ContextAuth();
  // const phoneNumber = "9819094281"; // Replace with your phone number
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message
  const [businessBills, setBusinessBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterResults, setFilterResults] = useState([])

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
          console.log(res?.data?.response);
          setBusinessBills(res?.data?.response);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setFilterResults(businessBills)
  }, [businessBills]);

  const handleButtonClick = (phoneNumber) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const contentRef = useRef(null);

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedDate(null);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    let finalData = businessBills?.map((bills) => {
      let finalDate = moment(bills?.createdAt).format("YYYY-MM-DD")
      return {
        ...bills,
        filterDate: finalDate
      }
    })
    const filteredResults = finalData?.filter((data) => {
      return data?.filterDate === e.target.value
    })
    setFilterResults(filteredResults)
    const selected = parse(e.target.value, "yyyy-MM-dd", new Date());
    const formattedDate = format(selected, "dd MMM yyyy");
    // console.log(formattedDate);

  };

  

  const filteredCards = filterResults.filter((card) => {
    const cardDate = new Date(card?.createdAt);
    // console.log(cardDate);

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
            <div className="flex justify-center items-center gap-x-4 mb-4 px-8">
              {/* <div className=" text-3xl font-extrabold">
                <AiFillFilter></AiFillFilter>
              </div> */}
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className=" outline-none px-2 py-2 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-1/2"
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
                className=" outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-1/2"
              />
            </div>

            {!loading ? (
              <div
                className="  md:grid md:grid-cols-2 md:gap-2 md:w-[50vw] gap-y-3 px-7 md:px-0 w-[100vw] pb-5"
                ref={contentRef}
                data-aos="flip-right"
              >
                {filteredCards?.map((customer, index) => {
                  const dateObj = new Date(customer?.createdAt)
                  return (
                    <CustomerCard
                      data={customer}
                      key={customer?.customerId?._id + index}
                      name={customer?.customerId?.customerName}
                      
                      date={dateObj}
                      amount={customer.grandtotal}
                      id={customer?.customerId?._id}

                      mobileNumber={customer?.customerId?.customerNumber}
                      grandTotal={customer?.grandtotal}
                      div={
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-start "
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


                  );
                })}
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
