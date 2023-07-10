import React, { useEffect } from "react";
import LayoutMain from "../components/layout/LayoutMain";
import temp_img from "../images/temp_img.svg";
import { useNavigate } from "react-router";

const InitialPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div>
      <LayoutMain>
        <div className="relative flex items-center justify-center h-screen transition duration-500 ease-in delay-500 bg-gray-800 ">
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
      </LayoutMain>
    </div>
  );
};

export default InitialPage;
