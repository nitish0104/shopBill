import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import temp_verify from "../../images/temp_verify.svg";
import LayoutManin from "../layout/LayoutManin";
import { ContextAuth } from "../../context/Context";

const VerifyOtpPage = () => {
  const { number } = ContextAuth();
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOTP(newOtp);

      if (index < 3 && value !== "") {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput.focus();
      }
    }
  };

  // Function to start the timer
  const startTimer = () => {
    setTimerActive(true);
    setTimer(60);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp.length >= 4) {
      return navigate("/main");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
    startTimer();
  }, [timer]);

  return (
    <LayoutManin>
      <div className=" relative flex flex-col items-center justify-start h-screen w-screen bg-gray-800">
        <img
          src={temp_verify}
          alt="Verify OTP"
          className="my-12 w-64 h-48 object-contain"
        />
        <div className="max-w-md  md:w-[30%] px-4 py-6 bg-blue-100 shadow-lg rounded-lg mx-7">
          <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
          <p className=" text-center">OTP send...</p>
          <div className="text-center flex justify-center items-center]">
            <Link
              to={"/mobileVerify"}
              className="text-center w-[100%] text-blue-700"
            >
              Edit Number
            </Link>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-center">
              {/* <input
                type="text"
                id="otp"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter OTP"
              /> */}

              <div className="flex justify-center space-x-2">
                <div className="mt-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      className="w-12 h-12 mx-1 text-3xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
              >
                Verify Otp
              </button>
            </div>
          </form>

          {isTimerActive ? (
            <p className="mt-4 text-lg">
              Resend OTP in {timer} {timer === 1 ? "second" : "seconds"}
            </p>
          ) : (
            <button
              onClick={startTimer}
              className="text-blue-500 hover:underline mt-4"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </LayoutManin>
  );
};

export default VerifyOtpPage;
