import React, { useEffect, useState } from "react";
import LayoutManin from "../components/layout/LayoutManin";
import temp_logo from "../images/temp_logo.svg";
import LoginWithOTP from "../components/Button/LoginWithOTP";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import Input from "../components/Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const { setNumber } = ContextAuth();
  setNumber(mobileNumber);
  const handleSubmitnumber = (e) => {
    e.preventDefault();
    toast.success("OTP send !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: false,
      theme: "light",
    });
    navigate("/verify");
    console.log(mobileNumber);
  };

  return (
    <LayoutManin>
      <div className="w-screen h-screen   md:flex md:items-center md:justify-center ">
        <div className="flex justify-center items-center bg-[#F1F1F1]  w-[100%] h-[35%] md:gap-6 md:w-[50%] md:h-screen ">
          <img
            src={temp_logo}
            alt="logo"
            className=" px-4 h-[60%] md:h-[40%]"
          />
        </div>
        <div className="flex  flex-col  justify-center items-center md:w-[50%] md:h-screen  w-[100%] h-[50%] mt-2 md:mt-0">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-center">Welcome</h1>
            <h1 className="font-semibold">Please login to your Shop</h1>
          </div>
          <div className="flex flex-col items-center justify-center md:w-full">
            <div className="flex flex-col md:gap-3  gap-1 mt-4 md:w-[50%]">
              <div className="text-center mb-4">
                <Input
                  type={"text"}
                  className={"pl-2"}
                  Label={"Mobile Number"}
                  id={"mobileNumber"}
                  maxLength={"10"}
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                  }}
                ></Input>
              </div>
              <button
                onClick={handleSubmitnumber}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                // onClick={handleSubmit}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </LayoutManin>
  );
};

export default Login;
