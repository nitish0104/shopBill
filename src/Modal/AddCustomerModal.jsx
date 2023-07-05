import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../components/Input/Input";
import { GrAdd, GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./ModalAnimation.css";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextAuth } from "../context/Context";
import jwtDecode from "jwt-decode";
import Spinner from "../components/Spinner";

const AddCustomerModal = ({ data, setModal }) => {
  const [showModal, setShowModal] = useState(false);
  const { setCustomerdata } = ContextAuth();

  // const { business } = ContextAuth();
  const [loading, setLoading] = useState(false);

  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;


  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModal({ show: false });
    }, 100); // Wait for the closing animation to complete (300ms)
  };
  useEffect(() => {
    setShowModal(true);
  }, [data]);

  const [customerNumber, setcustomerNumber] = useState("");
  const [customerName, setcustomerName] = useState("");
  const navigate = useNavigate();

  const createCustomer = async (e) => {
    e.preventDefault();
    try {
      if (customerName.length > 1 && customerNumber.length == 10) {
        setLoading(true);
        await axios("https://khatabook-one.vercel.app/addcustomer", {
          method: "POST",
          data: {
            customerNumber: customerNumber,
            customerName: customerName,
            businessId: businessId,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            console.log(res);
            navigate("/add-items");
            setCustomerdata(res.data.customer._id);
            // console.log(res.data.token);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CSSTransition
        in={showModal}
        classNames="modal"
        timeout={300}
        unmountOnExit
      >
        <div className="h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center fixed top-0 left-0 shadow-lg z-[100] ">
          <div
            className={
              "relative h-[50vh] w-[90vw] md:w-[50vw]  bg-white rounded-lg "
            }
          >
            <div>
              <form
                action=""
                className=" pt-8 px-5 flex flex-col gap-y-6 justify-center h-full "
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 font-bold text-2xl text-red-600"
                >
                  <AiOutlineClose />
                </button>

                <Input
                  type={"input"}
                  id={"name"}
                  Label={"Customer Name"}
                  placeholder={"Enter the Customer Name"}
                  value={customerName}
                  onChange={(e) => {
                    setcustomerName(e.target.value);
                  }}
                  className={"w-[95%]"}
                />

                <Input
                  type={"number"}
                  id={"number"}
                  Label={"Customer Number"}
                  placeholder={"Enter the Customer Number"}
                  value={customerNumber}
                  onChange={(e) => {
                    setcustomerNumber(e.target.value);
                  }}
                  className={"w-[95%]"}
                  maxLength={10}
                />
                <div className="pt-5  flex justify-center items-center">
                  <button
                    onClick={createCustomer}
                    className="flex justify-center items-center gap-x-2 bg-blue-600 px-3 py-1.5 rounded-md font-semibold hover:bg-blue-700 shadow hover:shadow-lg duration-150"
                  >
                    {!loading ? (
                      <p className="flex items-center gap-x-1">
                        {" "}
                        Next <GrLinkNext />
                      </p>
                    ) : (
                      <Spinner />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default AddCustomerModal;
