import React, { useEffect, useState } from "react";
import LayoutManin from "../components/layout/LayoutManin";
import temp_logo from "../images/temp_logo.svg";
import LoginWithOTP from "../components/Button/LoginWithOTP";
import { Link, useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import Input from "../components/Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiArrowBack } from "react-icons/bi";

const VerifyOTP = () => {
  const { mobileNo, setmobileNo } = ContextAuth();

  const navigate = useNavigate();

  const [otp, setOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setTimerActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const startTimer = async (e) => {
    setTimerActive(true);
    setTimer(60);

    if (mobileNo.length == 10) {
      e.preventDefault();
      try {
        await axios(
          "https://khatabook-one.vercel.app/sendotp",

          {
            method: "POST",
            data: { mobileNo: mobileNo },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res.data);

            localStorage.setItem("token", `${res?.data}`);
            setLoading(false);
            navigate("/verify");
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }

      console.log(mobileNo);
    } else {
      toast.error("Enter The Correct Number", {
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

  // Function to handle form submission
  const handleSubmitotp = async (e) => {
    if (otp.length == 6) {
      setLoading(true);

      e.preventDefault();
      try {
        await axios(
          "https://khatabook-one.vercel.app/verifyotp",
          {
            method: "POST",
            data: {
              otp: otp,
              mobileNo: mobileNo,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
          .then((res) => {
            console.log(res);
            if (res?.data?.error == false) {
              console.log(res.data);
              console.log(res.data.response);
              localStorage.setItem("token", res.data.response);
              setLoading(false);
              navigate("/dashboard");
            } else {
              toast.error("Incorrect Otp", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: false,
                theme: "light",
              });
              setLoading(false);
            }
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("The OTP Should be in six digit", {
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
    // Perform mobile number verification here

    // Start the timer
    // startTimer();
  };
  useEffect(() => {
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
    AOS.init();
  }, []);

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
    <>
      <LayoutManin>
        <div
          className="w-screen h-screen   md:flex md:items-center md:justify-center "
          data-aos="zoom-in"
        >
          <div className="flex justify-center items-center bg-[#F1F1F1]  w-[100%] h-[35%] md:gap-6 md:w-[50%] md:h-screen ">
            <Link
              to={`/login`}
              className={`flex items-center justify-center w-12 h-12 rounded-full border  fixed top-1 left-2 } `}
            >
              <div className="  text-3xl ">
                <BiArrowBack />
              </div>
            </Link>
            <img
              src={temp_logo}
              alt="logo"
              className=" px-4 h-[60%] md:h-[40%]"
            />
          </div>
          <div className="flex  flex-col  justify-center items-center md:w-[50%] md:h-screen  w-[100%] h-[50%] mt-4 md:mt-0">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-center">
                OTP Verification
              </h1>
            </div>
            <div className="flex flex-col items-center  md:w-full">
              <div className="flex flex-col md:gap-3  gap-1  md:w-[50%]">
                <div className="flex justify-center space-x-2">
                  <div className="mt-3">
                    <Input
                      type={"number"}
                      className={"pl-2 text-center"}
                      Label={"Enter the OTP"}
                      id={"otp"}
                      maxLength={"6"}
                      value={otp}
                      onChange={(e) => {
                        setOTP(e.target.value);
                      }}
                    ></Input>
                  </div>
                </div>
                {isTimerActive ? (
                  <div
                    className={`md:mt-4 pt-3  text-lg text-center mr-2 flex gap-x-2 justify-center items-center `}
                  >
                    <button
                      onClick={startTimer}
                      disabled={timer > 0}
                      className={`text-blue-500  ${
                        timer === 0
                          ? "text-opacity-100 cursor-pointer hover:underline"
                          : "text-opacity-50 cursor-wait"
                      } `}
                    >
                      Resend OTP
                    </button>
                    <p>
                      in {timer}{" "}
                      {timer === 1 || timer === 0 ? "Second" : "Seconds"}
                    </p>
                  </div>
                ) : (
                  <p>otp sent</p>
                )}

                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center py-2 px-4 rounded-full   mt-4 ${
                    !loading ? "cursor-pointer" : "cursor-default"
                  }`}
                  onClick={handleSubmitotp}
                >
                  {!loading ? "Verify Otp" : <Spinner />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </LayoutManin>
    </>
  );
};

export default VerifyOTP;
