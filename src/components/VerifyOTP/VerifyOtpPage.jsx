import React from "react";
import { Link } from "react-router-dom";
import temp_verify from "../../images/temp_verify.svg";
import LayoutManin from "../layout/LayoutManin";

const VerifyOtpPage = () => {
  return (
    <LayoutManin>
      <div className=" relative flex flex-col items-center justify-start h-screen bg-gray-800">
        <img
          src={temp_verify}
          alt="Verify OTP"
          className="my-12 w-64 h-48 object-contain"
        />
        <div className="max-w-md px-4 py-8 bg-blue-100 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
          <p className="mb-4">
            Please enter the OTP sent to your mobile number.
          </p>
          <form className="space-y-4">
            <div className="text-center">
              <label htmlFor="otp" className="text-lg font-semibold">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter OTP"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            >
              Verify
            </button>
          </form>
          <div className="flex mt-4 justify-between">
            <p className=" ">Don't have an OTP?</p>
            <Link to="mobileVerify" className="text-blue-500  ">
              Resend OTP
            </Link>
          </div>
        </div>
      </div>
    </LayoutManin>
  );
};

export default VerifyOtpPage;
