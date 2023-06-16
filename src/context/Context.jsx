import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Datacontext = createContext(null);

const Context = ({ children }) => {
  const [number, setNumber] = useState("");
  const [profile, setProfile] = useState('')
  // const [isTimerActive, setTimerActive] = useState(false);
  // const [timer, setTimer] = useState(60);
  // const startTimer = () => {
  //   setTimerActive(true);
  //   setTimer(60);
  // };


  return (
    <Datacontext.Provider value={{ number, setNumber,profile, setProfile }}>
      {children}
    </Datacontext.Provider>
  );
};

const ContextAuth = () => {
  return useContext(Datacontext);
};

export { Context, ContextAuth };
