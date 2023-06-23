import React, { useEffect, useState } from "react";
import LayoutMain from "../../components/layout/LayoutManin";
import Input from "../../components/Input/Input";
import Sidebar from "../../components/Sidebar";
import Navigation from "../../components/Navigation";
import { BiArrowBack } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import GenerateBiil from "../../components/GenerateBiil";
import { ThemeContextAuth } from "../../context/ThemeContext";
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
      items.map((obj) => {
        total += obj.cost;
        // let itemCost = obj.price * obj.qty;
        // total += itemCost
      });

      setGrandtotal(total);
      console.log(total);
    }
  }, [items]);

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
        <Navigation className={"cursor-not-allowed"} />
        <div className="md:w-[80vw] w-screen m-auto md:px-12  overflow-y-scroll flex-col  justify-center items-center">
          <div className="flex items-center justify-between pt-4 px-6 text-2xl">
            <Link to={"/add-customer"}>
              <BiArrowBack />
            </Link>
          </div>
          <div className="flex justify-center items-center gap-x-5">
            <div className="px-2 pt-4 md:w-[90%] flex justify-center items-center gap-x-4 ">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                placeholder={"Enter Items"}
                className={`w-[50%] h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                  isDarkMode ? "border-white" : "border-black"
                }`}
                required="true"
              />
              <input
                type="number"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                placeholder={"Quantity"}
                className={`w-[30%] h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                  isDarkMode ? "border-white" : "border-black"
                }`}
                required="true"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder={"Price"}
                className={`w-[20%] h-12  rounded-lg border-2  pl-2 focus:border-blue-500 text-black ${
                  isDarkMode ? "border-white" : "border-black"
                }`}
              />
            </div>
          </div>
          <div className="flex justify-end items-center pt-6 pb-6">
            <button
              onClick={addItem}
              className="bg-blue-500 px-1 py-3  w-40 mx-auto text-white font-semibold rounded-md   text-xl"
            >
              Add
            </button>
          </div>

          <div
            id="testid"
            className=" relative flex justify-center items-center w-full  px-4 "
          >
            <table
              className={`border-2 border-black p-2 w-full rounded-lg ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <thead>
                <tr className="flex items-center justify-center gap-x-12 md:gap-x-24  border-b-2 py-2">
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody className="">
                {items?.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="flex items-center justify-center gap-x-20 md:gap-x-32 border-b-2 py-2 text-xl"
                    >
                      <td className="text-center">{value?.item}</td>
                      <td className="text-center">{value?.qty}</td>
                      <td className="text-center">{value?.cost}</td>
                    </tr>
                  );
                })}
              </tbody>
              <div className="border-t-2 w-full flex justify-end pr-2 py-2">
                <p
                  className={`border-2 py-1 px-3 text-base ${
                    isDarkMode ? "border-white" : "border-black"
                  }`}
                >
                  GrandTotal: {grandtotal} /-
                </p>
              </div>
            </table>
          </div>

          <div className="flex justify-center items-center pt-6 pb-6 relative ">
            <GenerateBiil downloadFileName={"pdf1"} rootElementId={"testid"} />
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

export default AddItems;
