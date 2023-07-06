import React, { useEffect, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCustomerModal from "../../Modal/AddCustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import CustomerCard from "../../components/cards/HomeCard";
import { useNavigate } from "react-router-dom";

const AddCustomers = () => {
  const [modal, setModal] = useState({ show: false, data: {} });
  const { isDarkMode } = ThemeContextAuth();
  const [recentCustomer, setrecentCustomer] = useState(false);
  const [historyCustomer, sethistoryCustomer] = useState(false);
  const { allCustomer, setAllCustomer } = ContextAuth();
  const [searchedCustomer, setSearchedCustomer] = useState([]);
  const [searchCustomer, setsearchCustomer] = useState("");
  const navigate = useNavigate();
  const filterCustomer = allCustomer.filter(
    (allCustomer) =>
      allCustomer.customerName
        .toLowerCase()
        .includes(searchCustomer.toLowerCase()) ||
      allCustomer.customerNumber.includes(searchCustomer)
  );

  const handleRecentCustomerClick = () => {
    setrecentCustomer(!recentCustomer);
    sethistoryCustomer(false);
  };

  const handleHistoryCustomerClick = () => {
    sethistoryCustomer(!historyCustomer);
    setrecentCustomer(false);
  };
  useEffect(() => {
    handleRecentCustomerClick();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      axios("https://khatabook-one.vercel.app/getcustomer", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setAllCustomer(res.data.response);
          console.log("All Customer ", res.data.response);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSearch = (e) => {
    setsearchCustomer(e.target.value);
  };
  const handleCardClick = () => {
    navigate("/add-items");
  };

  // console.log(searchedCustomer);

  return (
    <>
      <LayoutManin>
        {modal.show && (
          <AddCustomerModal
            data={modal.show && modal.data}
            setModal={setModal}
          />
        )}
        <Sidebar />
        <Navigation />
        <div className="md:w-[70vw] w-[90vw] m-auto pb-10 ">
          <div className=" md:w-[70vw] flex justify-center items-center pt-6">
            <input
              type="text"
              id="searchBar"
              onChange={handleSearch}
              value={searchCustomer}
              placeholder="Search"
              className="h-12 w-[90vw] flex justify-center items-center  rounded-lg border-2 border-black pl-2 focus:border-blue-500"
            />
          </div>
        </div>

        {searchCustomer && (
          <div className="md:w-8/12  w-screen   md:grid md:grid-cols-3 md:gap-x-2 m-auto">
            {filterCustomer.map((customer, index) => (
              <div
                className={`bg-${isDarkMode ? "blue-200" : "cyan-50"} text-${
                  isDarkMode ? "white" : "gray-800"
                } p-4 rounded-lg  shadow-md shadow-blue-300 transform  perspective-100    overflow-hidden border m-2`}
              >
                <div className=" py-4 flex justify-center items-center w-[100%] ">
                  <div className="text-center w-[100%] ">
                    <button onClick={handleCardClick}>
                      <div className="font-bold text-xl mb-2">
                        {customer.customerName}
                      </div>

                      <p className=" font-semibold mb-2 text-center">
                        {customer.customerNumber}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center flex justify-center items-center h-[60vh]">
          <div className=" fixed  w-screen ">
            <button
              onClick={() => {
                setModal({ show: true });
              }}
              className={`   text-6xl p-2   rounded-full    ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <AiOutlineUserAdd />
            </button>
          </div>
        </div>
      </LayoutManin>
    </>
  );
};

export default AddCustomers;
