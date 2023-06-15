import React from "react";
import LayoutManin from "../components/layout/LayoutManin";
import temp_img from "../images/temp_img.svg";

const InitialPage = () => {
  return (
    <div>
      <LayoutManin>
        <div className="relative flex items-center justify-center h-screen">
          <img
            src={temp_img}
            alt="logo"
            className=" px-4 opacity-75 absolute  "
          />
          <div className="relative text-5xl flex-col justify-center items-center font-extrabold text-white ">
            <div className="text-center text-white ">My Digital </div>
            <div className="text-center text-white mt-4">Kirana</div>
          </div>
        </div>
      </LayoutManin>
    </div>
  );
};

export default InitialPage;
