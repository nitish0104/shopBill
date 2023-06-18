import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutManin from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";

const Main = () => {
  return (
    <>
      <LayoutManin>
        <Sidebar />
        <Navigation/>
      </LayoutManin>
    </>
  );
};

export default Main;
