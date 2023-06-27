import React, { useEffect, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCustomerModal from "../../Modal/AddCustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";
import CustomerCard from "../../components/cards/HomeCard";

const AddCustomers = () => {
  const [modal, setModal] = useState({ show: false, data: {} });
  const { isDarkMode } = ThemeContextAuth();
  const [recentCustomer, setrecentCustomer] = useState(false);
  const [historyCustomer, sethistoryCustomer] = useState(false);

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
              placeholder="Search"
              className="h-12 w-[90vw] flex justify-center items-center  rounded-lg border-2 border-black pl-2 focus:border-blue-500"
            />
          </div>
        </div>
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
