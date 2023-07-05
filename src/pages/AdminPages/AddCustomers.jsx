import React, { useEffect, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCustomerModal from "../../Modal/AddCustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";
import axios from "axios";
import { ContextAuth } from "../../context/Context";

const AddCustomers = () => {
  const [modal, setModal] = useState({ show: false, data: {} });
  const { isDarkMode } = ThemeContextAuth();
  const [recentCustomer, setrecentCustomer] = useState(false);
  const [historyCustomer, sethistoryCustomer] = useState(false);
  const { allCustomer, setAllCustomer } = ContextAuth();
  const [searchedCustomer, setSearchedCustomer] = useState([]);

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

  console.log(searchedCustomer);

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
              onChange={(e) => {
                setSearchedCustomer(e.target.value);
              }}
              placeholder="Search"
              className="h-12 w-[90vw] flex justify-center items-center  rounded-lg border-2 border-black pl-2 focus:border-blue-500"
            />
          </div>
        </div>

        {/* <div>
          {allCustomer.map((value, index) => {
            return <div key={index}>{value?.customerName}</div>;
          })}
        </div> */}
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
