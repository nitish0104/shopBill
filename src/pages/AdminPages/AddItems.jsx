import React, { useEffect, useRef, useState } from "react";
import LayoutMain from "../../components/layout/LayoutManin";
import Sidebar from "../../components/Sidebar";
import html2canvas from "html2canvas";
import noItems from "../../images/noItems.svg";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContextAuth } from "../../context/ThemeContext";
import { AiFillDelete, AiOutlineEdit , AiOutlineSave} from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import WhatsAppButton from "react-whatsapp-button";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ContextAuth } from "../../context/Context";
import Spinner from "../../components/Spinner";
import { input } from "@material-tailwind/react";

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
  const [loading, setLoading] = useState(false);
  const { customerData } = ContextAuth();
  const [editIndex, setEditIndex] = useState(null);
  const business = jwtDecode(`${localStorage.getItem("token")}`);
  const businessId = business._id;
  const [data, setData] = useState([]);
  const phoneNumber = "9819094281"; // Replace with your phone number
  const message = "Hello, how can I help you?"; // Replace with your desired message

  useEffect(() => {
    console.log(customerData);
    if (items) {
      let total = 0;

      items.map((obj) => {
        total += obj.price;
      });

      setGrandtotal(total);
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

  const cancel = () => {
    navigate("/add-customer");
  };
  const addItem = () => {
    if (item.length >= 1) {
      let obj = {
        item: item,

        qty: qty,
        individualPrice: individualPrice,
        price: Number(price),

        cost: Number(price),
        grandTotal: Number(grandtotal),
      };
      let finalItems = [...items];
      finalItems.push(obj);
      setItems(finalItems);
      setItem("");
      setPrice(0);
      setIndividualPrice(0);
      setQty("");
      setGrandtotal(0);
    }
  };



  const handleEditClick = (index) => {
    setEditIndex(index);
    setItem(items[index].item);
    setQty(items[index].qty);
    setIndividualPrice(items[index].individualPrice);
    setPrice(items[index].price);
  };

  const handleSaveClick = (index) => {
    const updatedItem = {item:item, qty:qty,individualPrice:Number(individualPrice), price: Number(price) };
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    setEditIndex(null);
    setItem("");
    setQty("");
    setPrice(0);
    setIndividualPrice(0)
  };

  
  const handleSplice = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  // const handleInputChange = (e, index) => {
  //   const newValue = e.target.value;

  //   setData((items) => {
  //     const newData = [...items];
  //     newData[index] = { ...newData[index], value: newValue };
  //     return newData;
  //   });
  // };

  const getBill = async () => {
    setLoading(true);
    console.log(customerData);
    console.log(businessId);
    console.log(items);
    try {
      await axios("https://khatabook-one.vercel.app/generatebill", {
        method: "POST",
        data: {
          customerId: customerData,
          businessId: businessId,
          items: items,
        },
      })
        .then((res) => {
          console.log(res);
          navigate("/get-bill");
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

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
                    required
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
                    required
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

              <div className="flex justify-end items-center my-5 gap-x-3 w-full">
                <button
                  onClick={addItem}
                  className="bg-blue-500 px-1 py-2  w-40 mx-auto text-white font-semibold rounded-md   text-xl"
                >
                  Add
                </button>
                {/* {editIndex ? (
                  <button onClick={handleSaveClick()} className="bg-blue-500 px-1 py-2  w-40 mx-auto text-white font-semibold rounded-md   text-xl">
                    Save
                  </button>
                ) : (
                  <button   onClick={() => handleEditClick()} className="bg-blue-500 px-1 py-2  w-40 mx-auto text-white font-semibold rounded-md   text-xl">
                    Edit
                  </button>
                )} */}
                {/* <button className="bg-blue-500 px-1 py-2  w-40 mx-auto text-white font-semibold rounded-md   text-xl">
                  Save
                </button>

                <button className="bg-blue-500 px-1 py-2  w-40 mx-auto text-white font-semibold rounded-md   text-xl">
                  Edit
                </button> */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {items.length > 0 ? (
              <>
                <table
                  className={`min-w-full divide-y divide-gray-200" border-2 border-b-black p-2  border-collapse rounded-lg ${
                    isDarkMode ? "border-white" : "border-black border-b-black"
                  }`}
                >
                  <thead>
                    <tr className="  border-b-2 py-2  text-center">
                      <th className="sticky left-0  bg-white py-2 px-4  ">
                        Item
                      </th>
                      <th className=" bg-white py-2 px-4 ">Quantity</th>
                      <th className=" bg-white py-2 px-4 ">Individual</th>
                      <th className=" bg-white py-2 px-4 ">Total</th>
                      <th className=" bg-white py-2 px-4 ">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items?.map((value, index) => {
                      return (
                        <tr
                          key={index}
                          className=" border-b-2  border-black text-x text-center "
                        >
                          <td className="sticky left-0 md:w-2/6 bg-white px-2 border whitespace-nowrap">
                            {index === editIndex ? (
                              <input
                                type="text"
                                value={item}
                                className="border  text-center md:w-auto border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                  setItem(e.target.value);
                                }}
                              />
                            ) : (
                              value.item
                            )}
                          </td>
                          <td className=" px-2 border md:w-40 whitespace-nowrap">
                            {index === editIndex ? (
                              <input
                              className="border  text-center md:w-32 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={qty}
                                onChange={(e) => {
                                  setQty(e.target.value);
                                }}
                              />
                            ) : (
                              value?.qty
                            )}
                          </td>

                          <td className=" px-2 border md:w-40  whitespace-nowrap">
                            &#8377;
                            {index === editIndex ? (
                              <input
                                type="number"
                                className="border  text-center md:w-32  border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={individualPrice}
                                onChange={(e) => {
                                  setIndividualPrice(e.target.value);
                                }}
                              />
                            ) : (
                              value?.individualPrice
                            )}
                          </td>
                          <td className=" px-2  border md:w-40  whitespace-nowrap ">
                            &#8377;
                            {index === editIndex ? (
                              <input
                                type="number"
                                className="border  text-center md:w-32 border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={  price}
                                onChange={(e) => {
                                  setPrice(e.target.value);
                                }}
                              />
                            ) : (
                              value?.price
                            )}
                          </td>

                          <td className="border px-4  py-2 flex justify-center  items-center gap-x-2">
                            <div>


                            {index === editIndex ? (
                              <button
                                onClick={() => handleSaveClick(index)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded "
                              >
                                <AiOutlineSave/>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEditClick(index)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded "
                              >
                                <AiOutlineEdit/>
                              </button>
                            )}
                            </div>
                            <button
                              onClick={() => {
                                handleSplice(index);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded whitespace-nowrap"
                            >
                              <AiFillDelete ></AiFillDelete>
                            </button>
                          </td>
                          {/* <button
                            className="w-full"
                            onClick={() => {
                              handleSplice(index);
                            }}
                          >
                            <td className="py-2 px-4  text-center flex justify-center hover:bg-red-500 rounded-lg  whitespace-nowrap ">
                              <AiFillDelete></AiFillDelete>
                            </td>
                          </button> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className=" w-full flex justify-center sticky left-0  pr-2 pt-4 gap-x-3">
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
              </>
            ) : (
              <div className=" mt-4   px-8  ">
                <div className="flex justify-around flex-col items-center">
                  <div className="w-[40%] md:w-[27%]">
                    <img src={noItems} alt="" />
                  </div>

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

          <div
            className={`w-full  flex justify-around items-center  bg-${
              isDarkMode ? "gray-800" : "white"
            } text-${isDarkMode ? "white" : "gray-800"} p-4`}
          >
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full  flex justify-center items-center gap-2   "
              onClick={getBill}
            >
              {!loading ? (
                <FaRupeeSign className="text-2xl font-bold"></FaRupeeSign>
              ) : (
                <Spinner />
              )}
            </button>
          </div>
        </div>
      </LayoutMain>
    </>
  );
};

export default AddItems;
