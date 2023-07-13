import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Datacontext = createContext(null);

const Context = ({ children }) => {
  const initialstate = {
    businessLogo: "",
    businessName: "",
    businessType: "",
    gstNo: "",
    location: "",
  };
  const [formState, setformState] = useState(initialstate);
  const [userDetails, setUserDetails] = useState(null);
  const [number, setNumber] = useState("");
  const [items, setitems] = useState(null);
  const [mobileNo, setmobileNo] = useState("");
  const [business, setBusiness] = useState("");
  const [customerData, setCustomerdata] = useState("");
  const [allCustomer, setAllCustomer] = useState([]);
  const [amount, setamount] = useState();
  const [logoUrl, setLogoUrl] = useState("");
  const [viewCustomerDetails, setViewCustomerDetails] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserDetails = (data) => {
    setUserDetails(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await axios
            .get("https://khatabook-one.vercel.app/getregisterbusiness", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              console.log(location);
              if (location.pathname === "/") {
                navigate("/dashboard");
              }else{
                return
              }
            });
        } catch (error) {
          navigate("/");
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

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
        setLogoUrl,
        formState,
        setformState,
        viewCustomerDetails,
        setViewCustomerDetails,
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
