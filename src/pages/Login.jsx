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
import axios from "axios";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const { mobileNo, setmobileNo } = ContextAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitnumber = async (e) => {
    if (mobileNo.length >= 10) {
      setLoading(true);

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
          .catch((err) =>{
            

            toast.error("Check Your Internet Connection or Try again later", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: false,
              theme: "light",
            })
            setLoading(false)
          });
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
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    
<>
<LayoutManin>

      <div className="w-screen h-screen   md:flex md:items-center md:justify-center ">
        <div
          data-aos="fade-right"
          className="flex justify-center items-center bg-[#F1F1F1]  w-[100%] h-[35%] md:gap-6 md:w-[50%] md:h-screen "
          >
          <img
            data-aos="zoom-in"
            data-aos-duration="1000"
            src={temp_logo}
            alt="logo"
            className=" px-4 h-[60%] md:h-[40%]"
            />
        </div>
        <div className="flex  flex-col  justify-center items-center md:w-[50%] md:h-screen  w-[100%] h-[50%] mt-2 md:mt-0">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">Welcome</h1>
            <h1 className="font-semibold">Please login to your Shop</h1>
          </div>
          <div className="flex flex-col items-center justify-center md:w-full">
            <div className="flex flex-col justify-center items-center md:gap-3  gap-1 mt-4 md:w-[50%]">
              <div className="text-center mb-4 w-[100%]">
                <Input
                  type={"text"}
                  className={"pl-2 text-center"}
                  Label={"Mobile Number"}
                  id={"mobileNo"}
                  maxLength={"10"}
                  value={mobileNo}
                  onChange={(e) => {
                    setmobileNo(e.target.value);
                  }}
                ></Input>
              </div>
              <button
                onClick={handleSubmitnumber}
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center  w-[100%] py-2 px-4 rounded-full  mt-4 ${
                  !loading ? "cursor-pointer" : "cursor-default"
                }`}
                // onClick={handleSubmit}
                >
                {!loading ? "Send Otp" : <Spinner />}
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

export default Login;
