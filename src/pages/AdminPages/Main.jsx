import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomerCard from "../../components/cards/HomeCard";
import { ContextAuth } from "../../context/Context";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineShop } from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import Input from "../../components/Input";

const Main = () => {
  const { userDetails, updateUserDetails } = ContextAuth();

  const { isDarkMode, toggleMode } = ThemeContextAuth();
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState(userDetails);

  const handleEdit = () => {
    setEditMode(true);
    setEditedDetails(userDetails);
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateUserDetails(editedDetails);
    setEditMode(false);
    // Save the updated changes
  };

  return (
    <>
      <LayoutManin>
        <div
          className={` overflow-hidden w-screen h-screen  rounded-t-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } `}
        >
          <Sidebar />
          {userDetails && (
            <div className="pt-10 h-[80%] flex-col justify-center items-center">
              <FaUserCircle
                size={100}
                className={`mx-auto ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                } `}
              />
              <div className="flex items-center pt-4 gap-x-2 justify-center">
                <AiOutlineShop className="text-2xl" />
                {editMode ? (
                  <Input
                    name={"BusinessName"}
                    id={"BusinessName"}
                    className={"font-medium text-xl"}
                    required
                    onChange={handleChange}
                    value={editedDetails.BusinessName}
                  />
                ) : (
                  <Input
                    name={"BusinessName"}
                    id={"BusinessName"}
                    className={"font-medium text-xl"}
                    onChange={handleChange}
                    value={userDetails.BusinessName}
                  />
                )}
              </div>

              <div className="flex items-center pt-4 justify-center gap-x-2">
                <IoBusinessOutline className="text-2xl " />
                {editMode ? (
                  <Input
                    name={"BusinessType"}
                    id={"BusinessType"}
                    onChange={handleChange}
                    className={"font-medium text-xl"}
                    value={editedDetails.BusinessType}
                  />
                ) : (
                  <Input
                    name={"BusinessType"}
                    id={"BusinessType"}
                    onChange={handleChange}
                    className={"font-medium text-xl"}
                    value={userDetails.BusinessType}
                  />
                )}
              </div>
              <div className="flex items-center pt-4 gap-x-2 justify-center">
                <HiOutlineReceiptTax className="text-2xl " />
                {editMode ? (
                  <Input
                    name={"gstNo"}
                    id={"gstNo"}
                    onChange={handleChange}
                    className={"font-medium text-xl"}
                    value={editedDetails.gstNo}
                  />
                ) : (
                  <Input
                    name={"gstNo"}
                    id={"gstNo"}
                    onChange={handleChange}
                    className={"font-medium text-xl"}
                    value={userDetails.gstNo}
                  />
                )}
              </div>
              <div className=" mt-14  flex items-center pt-4 gap-x-16 justify-center ">
                <div className="flex gap-x-10 w-[40%]">
                  {editMode ? (
                    <div className=" w-[100%]">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-[100%]"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="w-[100%] ">
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 w-[100%]"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <Navigation />
      </LayoutManin>
    </>
  );
};

export default Main;
