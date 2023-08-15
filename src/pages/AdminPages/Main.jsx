import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutMain";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { AiOutlineShop } from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploadComponent from "../../components/Input/ImageInput";
import axios from "axios";
import { ContextAuth } from "../../context/Context";
import PageLoader from "../../components/PageLoader";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { isDarkMode } = ThemeContextAuth();
  const [isEditable, setisEditable] = useState(false);
  const { setBusiness, formState, setformState, logoUrl,setUserLoading } = ContextAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios("https://khatabook-one.vercel.app/updatebusiness", {
        method: "PATCH",
        data: { ...formState },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setisEditable(false);
          setformState(res.data);
          window.location.reload();
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
        })
        .catch((err) => {
          toast.error("Something went wrong !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: false,
            theme: "light",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setformState((prevData) => ({
      ...prevData,
    }));
    setisEditable(true);
  };
  const handleChange = (e) => {
    setformState((prevdata) => ({
      ...prevdata,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      await axios("https://khatabook-one.vercel.app/getregisterbusiness", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          const response = res.data.response[0];
          setformState(response);
          setBusiness(response);
          if (
            res.data.response[0]?.businessName ||
            res.data.response[0]?.businessType ||
            res.data.response[0]?.gstNo ||
            res.data.response[0]?.location
          ) {
            setisEditable(false);
          } else {
            setisEditable(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Something went wrong! Please Login Again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: false,
            theme: "light",
          });
          localStorage.removeItem("token")
          setUserLoading(false)
          navigate('/login')

        });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: false,
        theme: "light",
      });
    }
  };

  return (
    <>
      <LayoutMain>
        <Sidebar />
        {loading && (
          <PageLoader
            className={
              "fixed z-[500] w-full h-screen top-0  bg-black bg-opacity-20 text-center "
            }
          />
        )}
        <div
          className={` overflow-auto md:overflow-y-hidden w-screen h-[80vh] rounded-t-lg pt-4 ${isDarkMode ? "bg-[#111827] text-white" : "bg-white text-gray-800"
            } `}
        >
          <div className="overflow-y-auto  md:overflow-hidden flex-col justify-center items-center pt-2">
            <ImageUploadComponent
              businessLogo={formState?.businessLogo}
              setformState={setformState}
              formState={formState}
              isEditable={isEditable}
              setisEditable={setisEditable}
            />
            {/* <div className="flex justify-center">
              <input
                id="uploadImage"
                type="file"
                accept="image/*"
                className=""
              />
            </div> */}
            <div className="md:grid md:grid-cols-2 md:px-36 items-end">
              <div className="flex items-center gap-x-2 justify-center">
                <div className="md:w-[30vw]">
                  <label
                    className="  text-sm flex justify-center items-center font-bold mb-1"
                    htmlFor="name"
                  >
                    Business Name
                  </label>
                  <div className="pl-2 flex items-center shadow appearance-none border rounded w-full  leading-tight focus:outline-none focus:shadow-outline">
                    <AiOutlineShop
                      className={`text-3xl text-transperent  mr-2  bg-transparent${isDarkMode ? " text-white" : " text-gray-800"
                        }`}
                    />
                    <input
                      className={`w-full py-2 px-2 font-semibold  leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800 bg-transparent ${isDarkMode ? " text-white" : " text-gray-800"
                        } `}
                      id="businessName"
                      type="text"
                      name="name"
                      required
                      value={formState?.businessName}
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

                  <div className=" pl-2 flex items-center shadow appearance-none border rounded w-full text-black leading-tight focus:outline-none focus:shadow-outline">
                    <IoBusinessOutline
                      className={`text-3xl text-transperent mr-2 ${isDarkMode ? " text-white" : " text-gray-800"
                        }`}
                    />
                    <input
                      className={`w-full py-2 px-2  font-semibold leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800 bg-transparent ${isDarkMode ? " text-white" : " text-gray-800"
                        } `}
                      id="businessType"
                      type="text"
                      name="name"
                      required
                      value={formState?.businessType}
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
                      className={`text-3xl text-transperent mr-2 ${isDarkMode ? " text-white" : " text-gray-800"
                        }`}
                    />
                    <input
                      className={`w-full py-2 px-2  leading-tight focus:outline-none focus:shadow-outline font-semibold placeholder:text-gray-800 bg-transparent ${isDarkMode ? " text-white" : " text-gray-800"
                        } `}
                      id="gstNo"
                      required
                      type="text"
                      name="name"
                      value={formState?.gstNo}
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
                      className={`text-2xl text-transperent mr-2  ${isDarkMode ? "  text-white" : " text-gray-800"
                        }`}
                    />
                    <input
                      className={`w-full py-2 px-2 font-semibold leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-800 bg-transparent ${isDarkMode ? " text-white" : " text-gray-800"
                        } `}
                      id="location"
                      type="text"
                      required
                      name="location"
                      value={formState?.location}
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
                      // className=""
                      className={`px-4 py-1.5 text-xl text-white rounded-md hover:bg-blue-600 w-[40%] ${isDarkMode
                        ? "bg-gradient-to-t from-blue-700 via-blue-800 to-blue-900 text-white hover:shadow-blue-950"
                        : "bg-blue-500 "
                        } text-${isDarkMode ? "white" : "gray-800"
                        } p-4 rounded-lg  shadow-md  transform  perspective-100  hover:shadow-lg  overflow-hidden border m-2`}
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

        <Navigation
          className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </LayoutMain>
    </>
  );
};

export default Main;
