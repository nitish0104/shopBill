import React from "react";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { LuIndianRupee } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { ThemeContextAuth } from "../context/ThemeContext";

const Navigation = ({className}) => {
  const { isDarkMode } = ThemeContextAuth();
  const loaction = useLocation();
  const routes = [
    {
      lable: "Home",
      icon: <AiOutlineHome size={25} />,
      route: "/dashboard",
    },
    {
      lable: "Add Customer",
      icon: <AiOutlineUserAdd size={25} />,
      route: "/add-customer",
    },
    {
      lable: "Get Bill",
      icon: <LuIndianRupee size={25} />,
      route: "/get-bill",
    },
  ];
  return (
    <>
      {/* <nav className="fixed bottom-0 z-30 w-full bg-black h-[8vh] flex justify-center rounded-t-xl"> */}
      <nav
        className={`fixed bottom-0 z-30 w-full  h-[8vh] flex justify-center rounded-t-xl  drop-shadow-2xl 
        
        ${
          isDarkMode ? "bg-blue-300 text-white" : "bg-slate-100 text-gray-800"
        } `}
      >
        <div className={`flex items-center justify-between w-full   px-10 text-black `}>
          {routes.map((obj) => {
            return (
              <Link
                to={obj.route}
                className={
                  obj.route === loaction.pathname
                    ? "flex flex-col items-center pt-1 text-blue-600 text-sm font-semibold rounded-lg ${className}"
                    : "flex flex-col items-center pt-1 text-sm "
                }
              >
                {obj.icon}
                <p>{obj.lable}</p>
              </Link>
            );
          })}

          {/* <Link to={"/main"} className="flex flex-col items-center pt-1 ">
            <AiOutlineHome size={25} />
            <p>Home</p>
          </Link>
          <Link
            to={"/add-customer"}
            className="flex flex-col items-center pt-1 "
          >
            <AiOutlineUserAdd size={25} />
            <p>Add Customer</p>
          </Link>
          <Link to={"/get-bill"} className="flex flex-col items-center pt-1 ">
            <LuIndianRupee size={25} />
            <p>Get Bill</p>
          </Link> */}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
