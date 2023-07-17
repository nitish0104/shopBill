import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Input from "../../components/Input/Input";
import {
  format,
  parse,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import noItems from "../../images/noItems.svg";
import { ThemeContextAuth } from "../../context/ThemeContext";
import {
  AiFillFilter,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShop,
} from "react-icons/ai";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import "./ShowCustomerDetail.css";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { BiArrowBack } from "react-icons/bi";
import Navigation from "../../components/Navigation";
import PageLoader from "../../components/PageLoader";
import moment from "moment";
import PaidModal from "../../Modal/PaidModal";
const ShowCustomerDetails = () => {
  const { isDarkMode } = ThemeContextAuth();
  const { id } = useParams();
  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;
  const [selected, setSelected] = useState(null);
  const [viewCustomerBills, setViewCustomerBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paidModal, setPaidModal] = useState({ show: false, data: {} });

  const { allCustomer, viewCustomerDetails, setViewCustomerDetails } =
    ContextAuth();
  const [modal, setModal] = useState({ show: false, data: {} });
  const [filterResults, setFilterResults] = useState([]);
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
          console.log(res?.data?.response?._id);
          setViewCustomerDetails(res?.data?.response);
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

  useEffect(() => {
    setFilterResults(viewCustomerBills);
  }, [viewCustomerBills]);

  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (event) => {
    setSelectedDate("");
    setFilter(event.target.value);
    const finalData = viewCustomerBills?.map((bill) => {
      const filterDate = moment(bill?.createdAt).format("YYYY-MM-DD");
      return {
        ...bill,
        filterDate: filterDate,
        filterDateMilliseconds: moment(bill?.createdAt).format("X"),
      };
    });
    if (event.target.value === "all") {
      setFilterResults(viewCustomerBills);
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
      setFilterResults(viewCustomerBills);
    }
  };
  const handleBack = () => {
    naviGate("/get-bill");
  };

  useEffect(() => {
    if (selectedDate?.length !== 0) {
      setFilter("all");
      let finalData = viewCustomerBills?.map((bills) => {
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
      setFilterResults(viewCustomerBills);
    }
  }, [selectedDate]);

  const handleSingleBill = (_id) => {
    naviGate(`/invoice/${_id}`);
  };
  console.log(filterResults);

  return (
    <>
      <LayoutMain>
        <Sidebar />
        <Navigation />
        <div className="overflow-y-auto pb-20">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-12 h-12 rounded-full border mt-3 ml-3"
          >
            <BiArrowBack className="text-3xl"></BiArrowBack>
          </button>
          <div className="text-xl flex gap-y-2  justify-center items-center pt-4 flex-col overflow-y-auto">
            <div className="md:w-[30vw] w-full px-2">
              <label
                className="  text-sm flex  items-center font-bold mb-0.5 px-1"
                htmlFor="name"
              >
                Customer Name
              </label>

              <input
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2 bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="name"
                type="text"
                name="name"
                value={viewCustomerDetails?.customerName}
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
                className="pl-2  flex items-center shadow appearance-none border rounded  focus:shadow-outline w-full py-2 px-2  bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                id="number"
                type="text"
                name="name"
                value={viewCustomerDetails?.customerNumber}
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
              className="outline-none px-2 py-2 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[45vw] "
            >
              <option
                className={`  ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                value="all"
              >
                All
              </option>
              <option
                className={`  ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                value="today"
              >
                Today
              </option>
              <option
                className={`  ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                value="yesterday"
              >
                Yesterday
              </option>
              <option
                className={`  ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                value="lastWeek"
              >
                Last Week
              </option>
              <option
                className={`  ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                value="lastMonth"
              >
                Last Month
              </option>
              <option
                className={`  ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
                value="lastYear"
              >
                Last Year
              </option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              className="outline-none px-2 py-1.5 border border-gray-300 bg-transparent  shadow-sm shadow-blue-200 rounded-md md:w-40 w-[45vw]"
            />
          </div>
          {paidModal.show && (
            <PaidModal
              data={paidModal.show && paidModal.data}
              setPaidModal={setPaidModal}
            />
          )}
          {!loading ? (
            <div>
              {filterResults?.length > 0 ? (
                <div>
                  {filterResults?.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className="pt-6 px-3 flex justify-center "
                      >
                        <div
                          className={`flex    duration-200 justify-between items-center py-3 px-2  hover:shadow-md  shadow-sm shadow-blue-200 outline-none  border border-gray-300 bg-transparent   hover:shadow-blue-200 rounded-md md:w-[30vw] w-full cursor-pointer   ${
                            isDarkMode
                              ? "hover:border-white"
                              : "hover:border-black"
                          }`}
                        >
                          <p
                            onClick={() => {
                              handleSingleBill(value?._id);
                            }}
                            className="flex items-center gap-x-2 w-5/12"
                          >
                            <p>
                              {format(
                                new Date(value?.createdAt),
                                "dd/MMM/yyyy"
                              )}
                            </p>
                          </p>
                          <div className="w-2/12 flex justify-center items-center">
                            {value?.grandtotal - value?.paid === 0 ? (
                              <div>
                                <p>
                                  <IoCheckmarkDoneCircle className="text-green-500 text-xl"></IoCheckmarkDoneCircle>{" "}
                                </p>
                              </div>
                            ) : (
                              <p
                                onClick={() => {
                                  setPaidModal({
                                    show: true,
                                    data: value?.customerId?._id,
                                  });
                                }}
                                className="text-red-500 hover:text-base hover:font-bold"
                              >
                                &#8377;{" "}
                                {value?.grandtotal -
                                  value?.paid -
                                  value?.discount}
                              </p>
                            )}
                          </div>
                          <p
                            className="w-5/12 flex justify-end items-center"
                            onClick={() => {
                              handleSingleBill(value?._id);
                            }}
                          >
                            Total: &#8377;
                            {value?.grandtotal - value?.discount}
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
      </LayoutMain>
    </>
  );
};

export default ShowCustomerDetails;
