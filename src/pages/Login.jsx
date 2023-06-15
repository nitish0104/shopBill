import React from "react";
import LayoutManin from "../components/layout/LayoutManin";
import temp_logo from "../images/temp_logo.svg";
import LoginWithOTP from "../components/Button/LoginWithOTP";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <LayoutManin>
        <div className=" relative flex flex-col justify-evenly items-center  h-screen text-center">
          <div className="text-center pt-10 h-[25%] md:h-[30%]">
            <img
              src={temp_logo}
              alt="logo"
              className=" px-4 h-[90%] md:h-[100%]"
            />
          </div>
          <div className="relative text-3xl md:text-5xl flex-col justify-center items-center font-extrabold text-white ">
            <div className="text-center text-white ">My Digital </div>
            <div className="text-center text-white md:mt-4">Kirana</div>
          </div>

          <div>
            <span className="text-blue-500 text-sm md:text-base underline">
              Welcome
            </span>
          </div>
          <div className="pb-12">
            <Link to="/mobileVerify">
              <LoginWithOTP></LoginWithOTP>
            </Link>
          </div>
          <div></div>
        </div>
      </LayoutManin>
    </div>
  );
};

export default Login;
