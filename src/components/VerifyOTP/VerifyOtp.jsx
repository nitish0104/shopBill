import React, { useState, useEffect } from "react";

const OTPVerification = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setTimerActive] = useState(false);

  // Function to handle input change for mobile number
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    <div className=" relative flex flex-col items-center  h-screen mt-8">
      <div>
        <label
          htmlFor="mobileNumber"
          className="text-2xl font-semibold text-white "
        >
          Mobile Number:
        </label>
        <input
          type="text"
          id="mobileNumber"
          maxLength="10"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          placeholder="Enter your mobile number"
          className="border border-gray-300 rounded-md p-2 mt-2 w-64"
        />
        <button
          onClick={startTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
        >
          Send Otp
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};

export default OTPVerification;
