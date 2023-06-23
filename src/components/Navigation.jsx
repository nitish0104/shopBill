import React from "react";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { LuIndianRupee } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { ThemeContextAuth } from "../context/ThemeContext";

const Navigation = ({ className, classNameLOGO }) => {
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
      lable: "Bill's",
      icon: <LuIndianRupee size={25} />,
      route: "/get-bill",
    },
  ];
  return (
    <>
      <footer
        className={`fixed bottom-0 z-30 w-full  h-[8vh] flex justify-center rounded-t-xl  drop-shadow-2xl 
        ${className}
          ${
            isDarkMode ? "bg-blue-300 text-white" : "bg-slate-200 text-gray-800"
          } `}
      >
        <div
          className={`flex items-center justify-between w-full   px-10 text-black `}
        >
          {routes.map((obj) => {
            return (
              <Link
                to={obj.route}
                className={
                  obj.route === loaction.pathname
                    ? `{flex flex-col items-center pt-1 text-blue-600 text-sm font-semibold rounded-lg ${classNameLOGO}}`
                    : "flex flex-col items-center pt-1 text-sm "
                }
              >
                {obj.icon}
                <p>{obj.lable}</p>
              </Link>
            );
          })}
        </div>
      </footer>
    </>
  );
};

export default Navigation;
