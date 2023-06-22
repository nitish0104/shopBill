import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Datacontext = createContext(null);

const Context = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (data) => {
    setUserDetails(data);
  };

  const [number, setNumber] = useState("");

  // const [isTimerActive, setTimerActive] = useState(false);
  // const [timer, setTimer] = useState(60);
  // const startTimer = () => {
  //   setTimerActive(true);
  //   setTimer(60);
  // };

  return (
    <Datacontext.Provider
      value={{ number, setNumber, userDetails, updateUserDetails }}
    >
      {children}
    </Datacontext.Provider>
  );
};

const ContextAuth = () => {
  return useContext(Datacontext);
};

export { Context, ContextAuth };
