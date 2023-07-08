import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextAuth } from "../../context/Context";
import { format } from "date-fns";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { AiOutlinePrinter } from "react-icons/ai";
const ShowSingleBill = () => {
  const [singleBill, setSingleBill] = useState();
  const [itemsSingeBill, setitemsSingeBill] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { business, formState, viewCustomerDetails } = ContextAuth();

  const handleDownload = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "download.png";
      link.click();
    });
  };
  const contentRef = useRef(null);
  useEffect(() => {
    console.log(business);
    setLoading(true);
    try {
      axios(`https://khatabook-one.vercel.app/getcustomerbill/${id}`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setSingleBill(res?.data?.response);
          setLoading(false);
          console.log(formState);
          setitemsSingeBill(res.data.response.items);
          console.log(itemsSingeBill);
          console.log(res.data.response.items);
          console.log(res.data.response._id);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div
        className="container mx-auto px-4 py-8 md:w-[70%] w-screen "
        ref={contentRef}
      >
        <div className="bg-white rounded-lg shadow-lg pb-4">
          <div className="flex justify-between bg-blue-500 text-white px-6 py-4 items-center">
            <h1 className="text-2xl font-bold">Bill</h1>
            {/* <p className='font-bold text-2xl'>Date: {format(new Date(singleBill?.createdAt), "dd/MMM/yyyy")}</p> */}
            <p className="">Date:{singleBill?.createdAt}</p>
          </div>
          <div className="flex justify-between px-6 py-4">
            <div>
              <span>
                <h2 className="text-xl font-bold">{formState?.businessName}</h2>
              </span>
              <h2 className="text-lg font-bold">{formState?.businessType}</h2>
              <p>{formState.location}</p>

              <p>{formState.phoneNo}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {viewCustomerDetails.customerName}
              </h2>
              <p>{viewCustomerDetails.customerNumber}</p>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-gray-200 text-gray-800 text-center">
              <tr>
                <th className="sticky left-0 w-20  py-2 px-4  ">Item</th>
                <th className="  py-2 px-4 ">Quantity</th>
                <th className="  py-2 px-4 ">Individual</th>
                <th className="  py-2 px-4 ">Total</th>
              </tr>
            </thead>
            <tbody>
              {itemsSingeBill?.map((items) => {
                return (
                  <tr className="text-center">
                    <td className="sticky left-0 md:w-2/6 w-40 bg-white px-2 border whitespace-nowrap">
                      {items.item}
                    </td>
                    <td className=" py-2 px-4  whitespace-nowrap">
                      {items.qty}
                    </td>
                    <td className=" py-2 px-4  whitespace-nowrap">
                      {items.price}
                    </td>
                    <td className=" py-2 px-4  whitespace-nowrap">
                      {items.cost}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-200 text-gray-800">
              <tr>
                <td colSpan="3" className="text-right py-2 px-4 font-bold">
                  Subtotal:
                </td>
                <td className="py-2 px-4">71.00</td>
              </tr>

              <tr>
                <td colSpan="3" className="text-right py-2 px-4 font-bold">
                  Total:
                </td>
                <td className="py-2 px-4">76.68</td>
              </tr>
            </tfoot>
          </table>
          <div className="flex justify-end mt-4 mr-6 mb-3 ">
            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-28 flex gap-4 justify-center items-center"
            >
              <AiOutlinePrinter></AiOutlinePrinter> Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSingleBill;
