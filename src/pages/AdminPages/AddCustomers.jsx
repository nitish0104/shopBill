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
        <div className="md:w-[70vw] w-[90vw] m-auto pb-10">
          <div className=" md:w-[70vw] flex justify-center items-center pt-6">
            <input
              type="text"
              id="searchBar"
              placeholder="Search"
              className="h-12 w-[90vw] flex justify-center items-center  rounded-lg border-2 border-black pl-2 focus:border-blue-500"
            />
          </div>
          {/* <div className="flex flex-col items-center justify-center w-[100%] mt-3"> */}
            {/* <div className="mb-4 w-[100%]">
              <button
                className="  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2 "
                onClick={handleRecentCustomerClick}
              >
                Recent
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
                onClick={handleHistoryCustomerClick}
              >
                History
              </button>
            </div> */}



{/* 
            {recentCustomer && (
              <div className="w-full md:grid md:grid-cols-2 md:gap-2	">
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Nitish Dalvi"}
                  date={"14/06/2023"}
                  amount={"562"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Abc XYZ"}
                  date={"24/06/2023"}
                  amount={"256"}
                ></CustomerCard>
              </div>
            )}

            {historyCustomer && (
              <div className="w-full md:grid md:grid-cols-2 md:gap-2">
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Prakash Jha"}
                  date={"14/04/2023"}
                  amount={"152"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Mrudul Kolambe"}
                  date={"28/04/2023"}
                  amount={"169"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Nitish Dalvi"}
                  date={"28/04/2023"}
                  amount={"169"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Nitish Dalvi"}
                  date={"28/04/2023"}
                  amount={"169"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Nitish Dalvi"}
                  date={"28/04/2023"}
                  amount={"169"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Nitish Dalvi"}
                  date={"28/04/2023"}
                  amount={"169"}
                ></CustomerCard>
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Prakash Jha"}
                  date={"14/04/2023"}
                  amount={"152"}
                ></CustomerCard>{" "}
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Prakash Jha"}
                  date={"14/04/2023"}
                  amount={"152"}
                ></CustomerCard>{" "}
                <CustomerCard
                  mobileNumber={"9987274285"}
                  name={"Prakash Jha"}
                  date={"14/04/2023"}
                  amount={"152"}
                ></CustomerCard>
              </div>
            )}
          </div> */}
        </div>
        <div className="text-center flex justify-center items-center">
          <div className=" fixed bottom-16 w-screen">
            <button
              onClick={() => {
                setModal({ show: true });
              }}
              className={`   text-5xl p-2   rounded-full    ${
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
