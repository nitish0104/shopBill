import React, { useEffect, useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineShop } from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploadComponent from "../../components/Input/ImageInput";
import axios from "axios";

const Main = () => {
  const initialstate = {
    businessLogo: "",
    businessName: "",
    businessType: "",
    gstNo: "",
    location: "",
  };
  const { isDarkMode } = ThemeContextAuth();
  const [formState, setformState] = useState(initialstate);
  const [isEditable, setisEditable] = useState(false);
  const [data, setData] = useState([]);

  const handleEditClick = () => {
    setisEditable(true);
  };

  const handleSubmit = () => {
    try {
      axios("https://khatabook-one.vercel.app/updatebusiness", {
        method: "PATCH",
        data: formState,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setisEditable(false);
          console.log(formState);
          // setformState(res.data);
          setData(res.data)
          toast.success("Profile updated !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: false,
            theme: "light",
          });
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setformState((prevdata) => ({
      ...prevdata,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    try {
      axios("https://khatabook-one.vercel.app/getregisterbusiness", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          // setformState(res.data.response);
          const response = res.data.response;
          // console.log(response);
          setData(...response);
          console.log();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <LayoutManin>
        <Sidebar />
        <div
          className={` overflow-auto md:overflow-y-hidden w-screen min-h-screen h-auto  rounded-t-lg pt-4 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } `}
        >
          <div className="overflow-y-auto  md:overflow-hidden flex-col justify-center items-center pt-2">
            <ImageUploadComponent></ImageUploadComponent>
            <div className="md:grid md:grid-cols-2 md:px-36">
              <div className="flex items-center gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="  text-sm flex justify-center items-center font-bold mb-1"
                    htmlFor="name"
                  >
                    Business Name
                  </label>
                  <div className="pl-2 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <AiOutlineShop
                      className={`text-3xl text-transperent ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    />
                    <input
                      className="w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                      id="businessName"
                      type="text"
                      name="name"
                      required
                      // value={formState.businessName}
                      value={data.businessName}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-4 justify-center gap-x-2">
                <div className="md:w-[30vw]">
                  <label
                    className="  text-sm flex justify-center items-center font-bold mb-1"
                    htmlFor="name"
                  >
                    Business Type
                  </label>

                  <div className=" pl-1 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <IoBusinessOutline
                      className={`text-3xl text-transperent ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    />
                    <input
                      className="w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                      id="businessType"
                      type="text"
                      name="name"
                      required
                      value={data.businessType}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center pt-4 gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="  text-sm flex justify-center items-center font-bold mb-1"
                    htmlFor="gstNo"
                  >
                    GST Number
                  </label>
                  <div className=" pl-2 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <HiOutlineReceiptTax
                      className={`text-3xl text-transperent ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    />
                    <input
                      className="w-full py-2 px-1 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                      id="gstNo"
                      required
                      type="text"
                      name="name"
                      value={data.gstNo}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center pt-4 gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="  text-sm flex justify-center items-center font-bold mb-1"
                    htmlFor="name"
                  >
                    Location
                  </label>
                  <div className=" pl-2 flex items-center shadow appearance-none border rounded w-full  leading-tight focus:outline-none focus:shadow-outline">
                    <GoLocation
                      className={`text-3xl text-transperent ${
                        isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    />
                    <input
                      className="w-full py-2 px-2 text-black leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800"
                      id="location"
                      type="text"
                      required
                      name="name"
                      value={data.location}
                      onChange={handleChange}
                      disabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-center pt-4 md:pt-16 gap-x-16 justify-center ">
              <div className="flex gap-x-10 md:w-[30%] w-[70vw]">
                {isEditable ? (
                  <div className=" w-[100%] flex justify-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-1.5 text-xl bg-green-500 text-white rounded-md hover:bg-green-600 w-[40%]"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="w-[100%] flex justify-center">
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="px-4 py-1.5 text-xl bg-blue-500 text-white rounded-md hover:bg-blue-600 w-[40%]"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

        <Navigation />
      </LayoutManin>
    </>
  );
};

export default Main;
