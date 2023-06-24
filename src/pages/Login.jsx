import React, { useEffect, useState } from "react";
import LayoutManin from "../components/layout/LayoutManin";
import temp_logo from "../images/temp_logo.svg";
import LoginWithOTP from "../components/Button/LoginWithOTP";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import Input from "../components/Input/Input";
import { toast } from "react-toastify";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const { setNumber } = ContextAuth();
  setNumber(mobileNumber);
  const handleSubmitnumber = (e) => {
    e.preventDefault();
    console.log(mobileNumber);
  

  };

  const [otp, setOTP] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setTimerActive] = useState(false);

  // Function to handle input change for mobile number

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
    console.log(mobileNumber);
  };

  // Function to handle form submission
  const handleSubmitotp = (e) => {
    e.preventDefault();
    console.log(otp);
    navigate('/dashboard')
    // Perform mobile number verification here

    // Start the timer
    // startTimer();
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
  }, [timer]);

  return (
    <LayoutManin>
      <div className=" relative flex flex-col  items-center  min-h-screen h-auto  bg-gray-800 text-center transition-opacity duration-1000 pt-10">
        <div className="text-center h-[30vh] ">
          <img
            src={temp_logo}
            alt="logo"
            className=" px-4 h-[100%] md:h-[20%]"
          />
        </div>
        {/* <div className=" text-3xl md:text-5xl flex-col justify-center items-center font-extrabold text-white pt-3">
          <p className="font-thin"> Welcome to ! </p>
          <div className="text-center text-white "> My Digital </div>
          <div className="text-center text-white md:mt-4">Kirana</div>
        </div> */}

        <div className="pt-5">
          <div className="max-w-md  w-[80vw]  px-4 py-4 bg-blue-100 shadow-lg rounded-lg ">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

            <form className="space-y-4">
              <div className="text-center mb-4">
                <Input
                  type={"number"}
                  className={"text-center"}
                  Label={"Mobile Number"}
                  id={"mobileNumber"}
                  maxLength={"10"}
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                  }}
                ></Input>
              </div>
              {/* <Link to="/verify"> */}
              <button
                onClick={handleSubmitnumber}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                // onClick={handleSubmit}
              >
                Send OTP
              </button>
              {/* </Link> */}
            </form>

            <form onSubmit={handleSubmitotp} className="space-y-4">
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
      </div>
    </LayoutManin>
  );
};

export default Login;
