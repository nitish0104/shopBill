import React, { useEffect, useRef, useState } from "react";
import LayoutMain from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import html2canvas from "html2canvas";
import noItems from "../../images/noItems.svg";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { AiFillDelete } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import WhatsAppButton from "react-whatsapp-button";

const AddItems = () => {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState(0);
  const [individualPrice, setIndividualPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState(0);
  const [paid, setPaid] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const { isDarkMode } = ThemeContextAuth();
  const [coupon, setCoupon] = useState();

  const phoneNumber = "9819094281"; // Replace with your phone number
  const message = "Hello, how can I help you?"; // Replace with your desired message

  // const handleButtonClick = () => {
  //   const encodedMessage = encodeURIComponent(message);
  //   const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  //   window.open(url, "_blank");
  // };
  useEffect(() => {
    if (items) {
      let total = 0;
      // eslint-disable-next-line
      items.map((obj) => {
        total += obj.cost;
        // let itemCost = obj.price * obj.qty;
        // total += itemCost
      });

      setGrandtotal(total);
      console.log(total);
    }
  }, [items]);
  const handleDownload = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "download.png";
      link.click();
    });
  };
  const contentRef = useRef(null);

  const navigate = useNavigate();

  const getBill = () => {
    navigate("/get-bill");
  };
  const cancel = () => {
    navigate("/add-customer");
  };
  const addItem = () => {
    let obj = {
      item: item,
      // qty: Number(qty),
      qty: qty,
      individualPrice: individualPrice,
      price: Number(price),
      // cost: Number(qty * price),
      cost: Number(price),
    };
    let finalItems = [...items];
    finalItems.push(obj);
    setItems(finalItems);
    setItem("");
    setPrice(0);
    setIndividualPrice(0);
    setQty("");

    console.log(finalItems);
  };

  const handleSplice = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // if(pending) {
  //   paid = grandtotal -pending
  // }

  // if(paid) {
  //   pending = grandtotal- paid
  // }

  console.log(grandtotal - paid);

  return (
    <>
      <LayoutMain className={""}>
        <Sidebar />

        <div className="md:w-[80vw] w-screen m-auto md:px-12   overflow-y-hidden flex-col  justify-center items-center">
          <div className="flex items-center justify-between mb-2  w-[90%]">
            <Link className=" px-6 text-2xl" to={"/add-customer"}>
              <BiArrowBack />
            </Link>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-3 flex justify-center items-center gap-2 md:w-[15%]"
              onClick={cancel}
            >
              <ImCancelCircle></ImCancelCircle> Cancel
            </button>
          </div>
          <div className="flex justify-center items-center gap-x-5">
            <div className="px-2 pt-4 md:w-[100%] flex-col justify-center items-center md:flex md:justify-center md:items-center gap-x-4 ">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                <div className="flex-col  ">
                  <div>
                    <label className="font-semibold">Items</label>
                  </div>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      setItem(e.target.value);
                    }}
                    placeholder={"Enter Items"}
                    className={`w-full h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                      isDarkMode ? "border-white" : "border-black"
                    }`}
                    required="true"
                  />
                </div>
                <div className="flex-col ">
                  <div>
                    <label className="font-semibold">Quantity</label>
                  </div>
                  <input
                    type="text"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    placeholder={"Enter Quantity"}
                    className={`w-full h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                      isDarkMode ? "border-white" : "border-black"
                    }`}
                    required="true"
                  />
                </div>
                <div className="flex-col ">
                  <div>
                    <label className="font-semibold"> Amount</label>
                  </div>
                  <input
                    type="number"
                    value={individualPrice}
                    onChange={(e) => {
                      setIndividualPrice(e.target.value);
                    }}
                    placeholder={"Enter Amount"}
                    className={`w-full h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                      isDarkMode ? "border-white" : "border-black"
                    }`}
                  />
                </div>
                <div className="flex-col ">
                  <div>
                    <label className="font-semibold"> Total</label>
                  </div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    placeholder={"Enter Total Price"}
                    className={`w-full h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                      isDarkMode ? "border-white" : "border-black"
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center my-5">
                <button
                  onClick={addItem}
                  className="bg-blue-500 px-1 py-2  w-40 mx-auto text-white font-semibold rounded-md   text-xl"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center " ref={contentRef}>
            <div className="w-[100vw] lg:w-2/3">
              {items.length > 0 ? (
                <div className="px-2">
                  <table
                    className={`min-w-full overflow-x-hidden divide-y  border-2 border-b-black p-2  border-collapse md:w-full rounded-lg ${
                      isDarkMode
                        ? "border-white"
                        : "border-black border-b-black"
                    }`}
                  >
                    <thead>
                      <tr className=" border-b-2 py-2  text-center">
                        <th className="py-2 px-4 w-4/12 ">Item</th>
                        <th className="py-2 px-4 w-2/12">Quantity</th>
                        <th className="py-2 px-4 w-2/12">Individual</th>
                        <th className="py-2 px-4 w-2/12">Total</th>
                        <th className="py-2 px-4 w-2/12">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {items?.map((value, index) => {
                        return (
                          <tr
                            key={index}
                            className=" border-b-2 py-2 border-black text-x text-center "
                          >
                            <td className="py-2 px-4 border">{value?.item}</td>
                            <td className="py-2 px-4 border">{value?.qty}</td>
                            <td className="py-2 px-4 border">
                              &#8377;{value?.individualPrice}
                            </td>
                            <td className="py-2 px-4 border">
                              &#8377;{value?.cost}
                            </td>
                            <td className="py-2 px-4  text-center flex justify-center hover:bg-red-500 rounded-lg ">
                              <button
                                onClick={() => {
                                  handleSplice(index);
                                }}
                              >
                                <AiFillDelete></AiFillDelete>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className=" w-full flex justify-center  pr-2 pt-4 gap-x-3">
                    <div
                      className={`flex items-center jc border-2 text-base py-1 gap-x-1 w-fit pl-2 ${
                        isDarkMode ? "border-white" : "border-black"
                      }`}
                    >
                      <p className="flex items-center  text-base">
                        Coupon: &#8377;{" "}
                      </p>
                      <input
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                        }}
                        className={`  w-[30%]   flex items-center text-black border-none outline-none`}
                        required="true"
                      />
                    </div>
                    <p
                      className={`border-2 py-1 px-3 text-base flex items-center w-[80%] ${
                        isDarkMode ? "border-white" : "border-black"
                      }`}
                    >
                      GrandTotal: &#8377;
                      {coupon ? grandtotal - coupon : grandtotal} /-
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" mt-4   px-8  ">
                  <div className="flex justify-around flex-col items-center">
                    <div className="w-[40%] md:w-[27%]">
                      <img src={noItems} alt="" />
                    </div>
                    {/* <div className=""> */}
                    <div
                      className={`flex flex-col justify-center items-center   text-${
                        isDarkMode ? "black" : "gray-800"
                      } p-4`}
                    >
                      <span className="font-mono   md:text-5xl text-xl">
                        Oop's! Data Not Found
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`w-full  flex justify-around items-center  bg-${
              isDarkMode ? "gray-800" : "white"
            } text-${isDarkMode ? "white" : "gray-800"} p-4`}
          >
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full  flex justify-center items-center gap-2   "
              onClick={getBill}
            >
              <FaRupeeSign className="text-2xl font-bold"></FaRupeeSign>
            </button>
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

export default AddItems;
