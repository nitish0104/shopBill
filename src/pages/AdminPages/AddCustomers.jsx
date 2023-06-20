import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { ContextAuth } from "../../context/Context";
import { AiOutlinePlus } from "react-icons/ai";
import AddCustomerModal from "../../Modal/AddCustomerModal";
import { ThemeContextAuth } from "../../context/ThemeContext";

const AddCustomers = () => {
  const [modal, setModal] = useState({ show: false, data: {} });

  const { profile } = ContextAuth();
  const { isDarkMode } = ThemeContextAuth();

  const [formState, setformState] = useState({
    searchName: "",
    searchNumber: "",
  });

  const handleChange = (e) => {
    setformState((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
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



        <div className="flex justify-center pt-6">
          <input
            type="text"
            id="searchBar"
            placeholder="Search"
            className="h-12 w-[90vw] rounded-lg border-2 border-black pl-2 focus:border-blue-700"
            value={formState?.searchName}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            onClick={() => {
              setModal({ show: true });
            }}
            className={`absolute right-4 text-5xl p-2 bottom-14   rounded-full ${
              isDarkMode? 'text-white' : 'text-black'
            }`}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </LayoutManin>
    </>
  );
};

export default AddCustomers;
