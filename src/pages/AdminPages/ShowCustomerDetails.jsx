import React, { useEffect, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../components/Input/Input";
import { format } from "date-fns";
import noItems from "../../images/noItems.svg";
import { ThemeContextAuth } from "../../context/ThemeContext";
import {
  AiFillFilter,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShop,
} from "react-icons/ai";
import { BsShare, BsWhatsapp } from "react-icons/bs";
import "./ShowCustomerDetail.css";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { BiArrowBack } from "react-icons/bi";
import Navigation from "../../components/Navigation";
import PageLoader from "../../components/PageLoader";
import ShowSingleBillModal from "../../Modal/ShowSingleBillModal";
import { data } from "autoprefixer";

const ShowCustomerDetails = () => {
  const { isDarkMode } = ThemeContextAuth();
  const { id } = useParams();
  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;
  const [selected, setSelected] = useState(null);
  const [viewCustomerDetails, setViewCustomerDetails] = useState("");
  const [viewCustomerBills, setViewCustomerBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const { allCustomer } = ContextAuth();
  const [modal, setModal] = useState({ show: false, data: {} });
  const naviGate = useNavigate();
  useEffect(() => {
    setLoading(true);
    try {
      const data = {
        customerId: id,
        businessId: businessId,
      };
      axios(`https://khatabook-one.vercel.app/getcustomerbill`, {
        method: "POST",
        data: data,

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setViewCustomerBills(res?.data?.response);
          setLoading(false);
          console.log(res.data.response);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios(`https://khatabook-one.vercel.app/getcustomer/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setViewCustomerDetails(res.data.response);
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggle = (e) => {
    if (selected === e) {
      return setSelected(null);
    }

    setSelected(e);
  };

  const cardData = [
    {
      date: "29/Jun/2023",
      items: ["maggi", "oats", "Buscuit"],
      individualPrice: [10, 10, 10],
      quantity: [2, 3, 4],
      total: [20, 30, 40],
      grandTotal: 90,
    },

    {
      date: "28/Jun/2023",
      items: ["egg", "dall", "Biscuit"],
      individualPrice: [5, 10, 10],
      quantity: [1, 1, 2],
      total: [5, 10, 20],
      grandTotal: 35,
    },
    {
      date: "20/Jun/2023",
      items: ["egg", "dall", "Biscuit"],
      individualPrice: [5, 10, 10],
      quantity: [1, 1, 2],
      total: [5, 10, 20],
      grandTotal: 35,
    },
    {
      date: "28/May/2023",
      items: ["egg", "dall", "Biscuit"],
      individualPrice: [5, 10, 10],
      quantity: [1, 1, 2],
      total: [5, 10, 20],
      grandTotal: 35,
    },
  ];

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (event) => {
    setSelectedDate("");
    setFilter(event.target.value);
  };
  useEffect(() => {
    setSelectedDate("");
  }, [filter]);

  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };
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
    // setSelectedDate(event.target.value);
  };

  const filteredCards = cardData.filter((card) => {
    const cardDate = new Date(card.date);

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


    const handleSingleBill = (_id) =>{
naviGate(`/invoice/${_id}`)
    }
  return (
    <>
      <LayoutManin>
        {modal.show && (
          <ShowSingleBillModal
            data={modal.show && modal.data}
            setmodal={setModal}
          />
        )}
        <Sidebar />
        <Navigation />
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
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="name"
                type="text"
                name="name"
                value={viewCustomerDetails.customerName}
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
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="number"
                type="text"
                name="name"
                value={viewCustomerDetails.customerNumber}
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
              value={filter}
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

            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[45vw]"
            />
          </div>

          {/* <div className="overflow-x-scroll px-4 pt-4 flex flex-col gap-y-6 items-center">
            {filteredCardsByDate?.map((value, index) => {
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

                      <button className="  font-bold  p-[6px] rounded-full  flex gap-2 justify-center items-center ">
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
          </div> */}

          {!loading ? (
            <div>
              {viewCustomerBills?.length > 0 ? (
                <div>
                  {viewCustomerBills?.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className="pt-6 px-3 flex justify-center "
                      >
                        <div onClick={()=>{
                          handleSingleBill(value?._id)
                        }} className="flex  hover:border-black  duration-200 justify-between items-center py-3 px-2  hover:shadow-lg  outline-none  border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-[30vw] w-full cursor-pointer">
                          <p className="flex items-center gap-x-1">
                            Date:{" "}
                            {format(new Date(value?.createdAt), "dd/MMM/yyyy")}
                          </p>
                          <p>
                            GrandTotal: {value?.grandtotal - value?.discount} Rs
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className=" mt-12   px-8  ">
                  <div className="flex justify-around flex-col md:justify-center items-center md:flex-row">
                    <div className="w-[40%] md:w-[20%] ">
                      <img src={noItems} alt="" />
                    </div>

                    <div
                      className={`flex flex-col justify-center items-center   text-${
                        isDarkMode ? "black" : "gray-800"
                      } p-4`}
                    >
                      <span className="font-mono    text-xl">
                        Oop's! No Data Available.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <PageLoader className={"h-[40vh]"} />
          )}
        </div>
      </LayoutManin>
    </>
  );
};

export default ShowCustomerDetails;
