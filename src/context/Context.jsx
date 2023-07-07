import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Datacontext = createContext(null);

const Context = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [number, setNumber] = useState("");
  const [items, setitems] = useState(null);
  const [mobileNo, setmobileNo] = useState("");
  const [business, setBusiness] = useState("");
  const [customerData, setCustomerdata] = useState("");
  const [allCustomer, setAllCustomer] = useState([]);
  const [amount, setamount] = useState();
  const [logoUrl, setLogoUrl] = useState("");
  const updateUserDetails = (data) => {
    setUserDetails(data);
  };

  return (
    <Datacontext.Provider
      value={{
        number,
        setNumber,
        userDetails,
        updateUserDetails,
        mobileNo,
        setmobileNo,
        business,
        setBusiness,
        customerData,
        setCustomerdata,
        allCustomer,
        setAllCustomer,
        amount,
        setamount,
        logoUrl, 
        setLogoUrl
      }}
    >
      {children}
    </Datacontext.Provider>
  );
};

const ContextAuth = () => {
  return useContext(Datacontext);
};

export { Context, ContextAuth };
