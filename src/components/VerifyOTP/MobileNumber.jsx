import React, { useState } from "react";
import temp_mobil from "../../images/temp_mobil.svg";
import { Link, useNavigate } from "react-router-dom";
import { ContextAuth } from "../../context/Context";

const MobileNumberForm = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate()
  const [isTimerActive, setTimerActive] = useState(false);
const {setNumber} = ContextAuth();
setNumber(mobileNumber)
const handleSubmit = () =>{
if(mobileNumber.length >= 10) {
  navigate('/verify')
}

}
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
              maxLength="10"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your mobile number"
            />
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
