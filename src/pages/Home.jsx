import React from "react";
import temp_img from "../images/temp_img.svg";
import LayoutMain from "../components/layout/LayoutMain";
import LoginWithOTP from "../components/Button/LoginWithOTP";

const Home = () => {
  //  Template Code
  return (
    <>
      <LayoutMain>
        <div className="relative  flex justify-center items-center text-4xl font-bold text-white">
          Khata Book App
        </div>
        <LoginWithOTP></LoginWithOTP>
        <img src={temp_img} alt="logo" className="relative" />
      </LayoutMain>
    </>
  );
};

export default Home;
