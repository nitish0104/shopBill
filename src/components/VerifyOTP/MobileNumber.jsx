import React from "react";
import temp_mobil from "../../images/temp_mobil.svg";
import { Link } from "react-router-dom";

const MobileNumberForm = () => {
  return (
    <div className=" relative flex flex-col items-center justify-start h-screen bg-gray-800">
      <img
        src={temp_mobil}
        alt="Mobile Number"
        className="my-16  w-64 h-48 object-contain"
      />
      <div className="max-w-md px-4 py-8 bg-blue-100 shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </h2>
        <div className="mb-6">
          <div className="text-center">
            <span>We will send you an </span>

            <span className="font-semibold">One Time Password</span>
          </div>
          <div className="text-center">
            <span className="">on this mobile number</span>
          </div>
        </div>
        <form className="space-y-4">
          <div className="text-center mb-4">
            <label
              htmlFor="mobileNumber"
              className="text-lg font-semibold text-center"
            >
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your mobile number"
            />
          </div>
          <Link to="/verify">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            >
              Send OTP
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default MobileNumberForm;
