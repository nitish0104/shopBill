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
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
const AddItems = () => {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [grandtotal, setGrandtotal] = useState(0);
  const { isDarkMode } = ThemeContextAuth();

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
      qty: Number(qty),
      price: Number(price),
      cost: Number(qty * price),
    };
    let finalItems = [...items];
    finalItems.push(obj);
    setItems(finalItems);
    setItem("");
    setPrice(0);
    setQty(0);

    console.log(finalItems);
  };

  return (
    <>
      <LayoutMain className={"overflow-auto"}>
        <Sidebar />

        <div className="md:w-[80vw] w-screen m-auto md:px-12 md:pb-28  overflow-y-scroll flex-col  justify-center items-center">
          <div className="flex items-center justify-between pt-4 w-[90%]">
            <Link className=" px-6 text-2xl" to={"/add-customer"}>
              <BiArrowBack />
            </Link>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 flex justify-center items-center gap-2 md:w-[15%]"
              onClick={cancel}
            >
              <ImCancelCircle></ImCancelCircle> Cancel
            </button>
          </div>
          <div className="flex justify-center items-center gap-x-5">
            <div className="px-2 pt-4 md:w-[100%] flex justify-center items-center gap-x-4 ">
              <div className="flex-col w-[50%] ">
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
              <div className="flex-col w-[20%] ">
                <div>
                  <label className="font-semibold"> Qty</label>
                </div>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                  placeholder={"Quantity"}
                  className={`w-full h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                    isDarkMode ? "border-white" : "border-black"
                  }`}
                  required="true"
                />
              </div>
              <div className="flex-col w-[20%]">
                <div>
                  <label className="font-semibold"> Amount</label>
                </div>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  placeholder={"Price"}
                  className={`w-full h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                    isDarkMode ? "border-white" : "border-black"
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-6 pb-6">
            <button
              onClick={addItem}
              className="bg-blue-500 px-1 py-3  w-40 mx-auto text-white font-semibold rounded-md   text-xl"
            >
              Add
            </button>
          </div>
          <div className="flex justify-center" ref={contentRef}>
            <div className="w-full lg:w-2/3">
              {items.length > 0 ? (
                <div>
                  <table
                    className={`border-2 border-b-black p-2 border-collapse w-full rounded-lg ${
                      isDarkMode
                        ? "border-white"
                        : "border-black border-b-black"
                    }`}
                  >
                    <thead>
                      <tr className=" border-b-2 py-2  text-center">
                        <th className="py-2 px-4">Item</th>
                        <th className="py-2 px-4">Quantity</th>
                        <th className="py-2 px-4">Total</th>
                        <th className="py-2 px-4">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {items?.map((value, index) => {
                        return (
                          <tr
                            key={index}
                            className=" border-b-2 py-2 text-x text-center"
                          >
                            <td className="py-2 px-4 border">{value?.item}</td>
                            <td className="py-2 px-4 border">{value?.qty}</td>
                            <td className="py-2 px-4 border">{value?.cost}</td>
                            <td className="py-2 px-4 border text-center flex justify-center hover:bg-red-500 rounded-lg ">
                              <AiFillDelete></AiFillDelete>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="border-t-2 w-full flex justify-end  pr-2 py-2">
                    <p
                      className={`border-2 py-1 px-3 text-base ${
                        isDarkMode ? "border-white" : "border-black"
                      }`}
                    >
                      GrandTotal: &#8377;{grandtotal} /-
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" mt-12  bg-gray-100 px-8  ">
                  <div className="flex justify-around items-center">
                    <div className="w-[40%]">
                      <img src={noItems} alt="" />
                    </div>
                    {/* <div className=""> */}
                    <div
                      className={`flex flex-col justify-center items-center  gap-y-10 text-${
                        isDarkMode ? "black" : "gray-800"
                      } p-4`}
                    >
                      <span className="font-mono   md:text-5xl text-2xl">
                        Oop's Data
                      </span>
                      <span className="font-mono   md:text-5xl text-2xl">
                        Not Found{" "}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`w-full  flex justify-around items-center gap-6 py-6  fixed bottom-2  bg-${
                isDarkMode ? "gray-800" : "white"
              } text-${isDarkMode ? "white" : "gray-800"} p-4`}
            >
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex justify-center items-center gap-2 md:w-[15%] w-[50%] "
                onClick={getBill}
              >
                <FaRegMoneyBillAlt></FaRegMoneyBillAlt> Generate Bill
              </button>

              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 flex gap-2 justify-center items-center md:w-[15%] w-[50%]"
                onClick={handleDownload}
              >
                <BsWhatsapp></BsWhatsapp> Send Bill
              </button>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

export default AddItems;
