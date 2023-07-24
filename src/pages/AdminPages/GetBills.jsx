import React, { useEffect, useRef, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import CustomerCard from "../../components/cards/HomeCard";

import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-modal";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContextAuth } from "../../context/ThemeContext";
import noItems from "../../images/noItems.svg";
import PageLoader from "../../components/PageLoader";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillPreviewModal from "../../Modal/BillPreviewModal";
const GetBills = () => {
  const { setCustomerID, customerID } = ContextAuth();
  const message = "Maggie(8) -40Rs  "; // Replace with your desired message
  const [businessBills, setBusinessBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterResults, setFilterResults] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredDates, setFilteredDates] = useState("");

  const [showBillPreview, setShowBillPreview] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("all");
  const [totalTurnover, setTotalTurnover] = useState();
  const { isDarkMode } = ThemeContextAuth();
  const contentRef = useRef(null);

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
          setBusinessBills(res?.data?.response);
          // console.log(res?.data?.response);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setFilterResults(businessBills);
  }, [businessBills]);

  useEffect(() => {
    if (selectedDate?.length !== 0) {
      setFilteredDates("");
      // setFilter("all");
      let finalData = businessBills?.map((bills) => {
        let finalDate = moment(bills?.createdAt).format("YYYY-MM-DD");
        return {
          ...bills,
          filterDate: finalDate,
        };
      });
      const filteredResults = finalData?.filter((data) => {
        return data?.filterDate === selectedDate;
      });
      setFilterResults(filteredResults);
    } else {
      setFilterResults(businessBills);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (filteredDates?.length !== 0) {
      setFilter("all");
      let finalData = businessBills?.map((bills) => {
        let finalDate = moment(bills?.createdAt).format("YYYY-MM-DD");
        return {
          ...bills,
          filterDate: finalDate,
        };
      });
      const filteredResults = finalData?.filter((data) => {
        return data?.filterDate === filteredDates;
      });
      setFilterResults(filteredResults);
    } else {
      setFilterResults(businessBills);
    }
  }, [filteredDates]);
  useEffect(() => {
    const totalTurnoverResult = handleTotalTurnover(
      selectedTimePeriod,
      filter,

      businessBills
    );
    setTotalTurnover(totalTurnoverResult);
  }, [selectedTimePeriod, filter, businessBills]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const finalData = businessBills?.map((bill) => {
      const filterDate = moment(bill?.createdAt).format("YYYY-MM-DD");
      console.log(bill?.createdAt);
      return {
        ...bill,
        filterDate: filterDate,
        filterDateMilliseconds: Number(moment(bill?.createdAt).format("x")),
      };
    });
    if (start && end) {
      let milisecondsStart = Number(moment(start).format("x"));
      let milisecondsEnd = Number(moment(end).format("x")) + 86400000;
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            milisecondsStart <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < milisecondsEnd
          );
        })
      );
    } else {
      setFilterResults(businessBills);
    }
  };

  const handleButtonClick = (phoneNumber) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const handleFilterChange = (event) => {
    setSelectedDate("");
    setFilteredDates("");
    setFilter(event.target.value);
    setSelectedTimePeriod(event.target.value);
    const finalData = businessBills?.map((bill) => {
      const filterDate = moment(bill?.createdAt).format("YYYY-MM-DD");
      return {
        ...bill,
        filterDate: filterDate,
        filterDateMilliseconds: moment(bill?.createdAt).format("X"),
      };
    });
    if (event.target.value == "all") {
      setFilterResults(businessBills);
    } else if (event.target.value === "today") {
      const today = moment().format("YYYY-MM-DD");
      setFilterResults(
        finalData?.filter((bill) => {
          return bill?.filterDate === today;
        })
      );
    } else if (event.target.value === "yesterday") {
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
      setFilterResults(
        finalData?.filter((bill) => {
          return bill?.filterDate === yesterday;
        })
      );
    } else if (event.target.value === "lastWeek") {
      const lastWeek = moment().subtract(1, "week").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastWeek <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else if (event.target.value === "lastMonth") {
      const lastMonth = moment().subtract(1, "months").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastMonth <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else if (event.target.value === "lastYear") {
      const lastYear = moment().subtract(1, "years").format("X");
      const today = moment().format("X");
      setFilterResults(
        finalData?.filter((bill) => {
          return (
            lastYear <= bill?.filterDateMilliseconds &&
            bill?.filterDateMilliseconds < today
          );
        })
      );
    } else {
      setFilterResults(businessBills);
    }
  };

  // setSelectedDate(filter);
  const handleTotalTurnover = (selectedPeriod) => {
    setSelectedDate("");
    setFilteredDates("");
    const filteredBills = businessBills.filter((bill) => {
      // console.log(selectedPeriod);
      const billDate = moment(bill.createdAt);
      if (selectedPeriod === "all") {
        return businessBills.reduce(
          (total, bill) => total + (bill.grandtotal - bill.discount),
          0
        ); // No filtering needed, include all bills
      } else if (selectedPeriod === "today") {
        const todayStart = moment().startOf("day");
        const todayEnd = moment().endOf("day");
        return billDate.isBetween(todayStart, todayEnd, null, "[]");
      } else if (selectedPeriod === "yesterday") {
        const yesterdayStart = moment().subtract(1, "days").startOf("day");
        const yesterdayEnd = moment().subtract(1, "days").endOf("day");
        return billDate.isBetween(yesterdayStart, yesterdayEnd, null, "[]");
      } else if (selectedPeriod === "lastWeek") {
        const lastWeekStart = moment().subtract(1, "weeks").startOf("day");
        const lastWeekEnd = moment().endOf("day");
        return billDate.isBetween(lastWeekStart, lastWeekEnd, null, "[]");
      } else if (selectedPeriod === "lastMonth") {
        const lastMonthStart = moment().subtract(1, "months").startOf("day");
        const lastMonthEnd = moment().endOf("day");
        return billDate.isBetween(lastMonthStart, lastMonthEnd, null, "[]");
      } else if (selectedPeriod === "lastYear") {
        const lastYearStart = moment().subtract(1, "years").startOf("day");
        const lastYearEnd = moment().endOf("day");
        return billDate.isBetween(lastYearStart, lastYearEnd, null, "[]");
      }
    });

    // Calculate the total turnover based on the filtered bills
    const totalTurnover = filteredBills.reduce((total, bill) => {
      return total + (bill.grandtotal - bill.discount);
    }, 0);

    return totalTurnover;
  };

  const handleClick = (_id) => {
    console.log(_id);
    setCustomerID(_id);
    setShowBillPreview(true);
  };

  return (
    <>
      <BillPreviewModal
        showModal={showBillPreview}
        setShowModal={setShowBillPreview}
        billID={customerID}
      />
      <LayoutMain>
        <Sidebar />
        <div className=" md:w-[90vw] w-[100vw]  flex justify-center items-center  my-5 mx-auto">
          <div className="md:w-[100vw] flex-col justify-center items-center">
            <div className="flex flex-col justify-center gap-y-2 w-full">
              <div className="flex justify-center gap-x-2 px-2">
                <div className="w-1/2 md:w-fit">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Date Range"
                    selectsRange
                    isClearable
                    dateFormat="dd/MMM/yyyy"
                    popperPlacement="bottom-start"
                    className={`outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[100%] ${
                      isDarkMode
                        ? "placeholder-white placeholder:opacity-60"
                        : "placeholder-gray-500"
                    }`}
                    renderCustomHeader={({
                      date,
                      decreaseMonth,
                      increaseMonth,
                    }) => (
                      <div>
                        <button onClick={decreaseMonth}>{"<"}</button>
                        <span>{moment(date).format("MMM yyyy")}</span>
                        <button onClick={increaseMonth}>{">"}</button>
                      </div>
                    )}
                  />
                </div>

                <div className="w-1/2 md:w-fit">
                  <input
                    type="date"
                    value={selectedDate}
                    placeholder="Select Date"
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                    }}
                    className={`outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[100%] `}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center gap-x-2  mb-4 px-2">
                <div className="w-1/2 md:w-fit">
                  <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className=" outline-none px-2 py-2 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[100%]"
                  >
                    <option
                      className={` text-${isDarkMode ? "black" : "gray-800"}`}
                      value="all"
                    >
                      All
                    </option>
                    <option
                      className={` text-${isDarkMode ? "black" : "gray-800"}`}
                      value="today"
                    >
                      Today
                    </option>
                    <option
                      className={` text-${isDarkMode ? "black" : "gray-800"}`}
                      value="yesterday"
                    >
                      Yesterday
                    </option>
                    <option
                      className={` text-${isDarkMode ? "black" : "gray-800"}`}
                      value="lastWeek"
                    >
                      Last Week
                    </option>
                    <option
                      className={` text-${isDarkMode ? "black" : "gray-800"}`}
                      value="lastMonth"
                    >
                      Last Month
                    </option>
                    <option
                      className={` text-${isDarkMode ? "black" : "gray-800"}`}
                      value="lastYear"
                    >
                      Last Year
                    </option>
                  </select>
                </div>

                <div className="border border-gray-300 shadow-sm rounded-md   shadow-blue-200 px-2  w-1/2 md:w-40">
                  <p className="py-2">TO: {totalTurnover} Rs</p>
                </div>
              </div>
            </div>

            {!loading ? (
              <div ref={contentRef} data-aos="flip-right">
                {filterResults?.length > 0 ? (
                  <div className="md:grid md:grid-cols-2 md:gap-2 md:w-[60vw] mx-auto grid gap-y-1  md:px-0 w-[100vw] pb-8">
                    {filterResults?.map((customer, index) => {
                      const dateObj = new Date(customer?.createdAt);
                      // console.log(customer);
                      return (
                        <CustomerCard
                          onClick={handleClick}
                          data={customer}
                          key={customer?.customerId?._id + index}
                          name={customer?.customerId?.customerName}
                          date={dateObj}
                          amount={customer?.grandtotal}
                          discount={customer?.discount}
                          id={customer?.customerId?._id}
                          billId={customer?._id}
                          mobileNumber={customer?.customerId?.customerNumber}
                          grandTotal={customer?.grandtotal}
                          time={moment(customer?.createdAt).format("h:mm a")}
                          paid={customer?.paid}
                          div={
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-start "
                              phoneNumber={customer?.customerNumber}
                              message={message}
                              onClick={() => {
                                handleButtonClick(customer?.customerNumber);
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
                  <div className=" mt-36   px-8 ">
                    <div className="flex md:justify-around flex-col justify-center items-center md:flex-row">
                      <div className="w-[40%] md:w-[20%] ">
                        <img src={noItems} alt="" />
                      </div>

                      <div
                        className={`flex flex-col justify-center items-center   ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        } p-4`}
                      >
                        <span className="font-mono  text-center  text-xl">
                          Oop's! No Data Available.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <PageLoader className={"h-[60vh]"} />
            )}
          </div>
        </div>
        <Navigation />
      </LayoutMain>
    </>
  );
};

export default GetBills;
