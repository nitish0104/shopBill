import React, { useState } from "react";
import temp_mobil from "../../images/temp_mobil.svg";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../../context/Context";
import Input from "../Input/Input";

const MobileNumberForm = () => {
  // const [mobileNumber, setMobileNumber] = useState([
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  // ]);
  const [mobileNumber, setMobileNumber] = useState("");
  // const handleChange = (e, index) => {
  //   const { value } = e.target;

  //   if (value.length <= 1 && /^\d*$/.test(value)) {
  //     const newOtp = [...mobileNumber];
  //     newOtp[index] = value;
  //     setMobileNumber(newOtp);

  //     if (index < 10 && value !== "") {
  //       const nextInput = document.getElementById(`otp-input-${index + 1}`);
  //       nextInput.focus();
  //     }
  //   }
  // };

  const navigate = useNavigate();
  const { setNumber } = ContextAuth();
  setNumber(mobileNumber);
  const handleSubmit = () => {
    console.log(mobileNumber);
    navigate("/verify");
  };
  return (
    <div className=" relative flex flex-col items-center justify-start h-screen w-screen bg-gray-800">
      <img
        src={temp_mobil}
        alt="Mobile Number"
        className="my-16  w-64 h-48 object-contain"
      />
      <div className="max-w-md  md:w-[30%] px-4 py-8 bg-blue-100 shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </h2>
        <div className="mb-6">
          <div className="text-center">
            <span>OTP will send to this Mobile</span>
          </div>
        </div>
        <form className="space-y-4">
          <div className="text-center mb-4">
            <Input
              type={"input"}
              className={"text-center"}
              Label={"Mobile Number"}
              id={"mobileNumber"}
              maxLength={"10"}
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            ></Input>
            {/* {mobileNumber.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-8 h-8  text-3xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            ))} */}
          </div>
          {/* <Link to="/verify"> */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            onClick={handleSubmit}
          >
            Send OTP
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default MobileNumberForm;
