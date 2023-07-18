import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ContextAuth } from "../../context/Context";

import { useRef } from "react";

import { AiOutlinePrinter } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import moment from "moment";
import { ThemeContextAuth } from "../../context/ThemeContext";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import PageLoader from "../../components/PageLoader";

const ShowSingleBill = () => {
  const REACT_APP_BUSINESS_TOKEN = process.env.REACT_APP_BUSINESS_TOKEN;
  const [singleBill, setSingleBill] = useState();
  const [itemsSingeBill, setitemsSingeBill] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { business, formState } = ContextAuth();
  const { isDarkMode } = ThemeContextAuth();
  const location = useLocation();
  const [handleShare, setHandleShare] = useState(true);
  const [cloudinaryURL, setcloudinaryURL] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const dataURLToBlob = (dataUrl) => {
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  // const uploadToCloudinary = (dataImageUrl) => {
  //   const blob = dataURLToBlob(dataImageUrl);
  //   const file = new File([blob], "image.png");
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "dva9i9vs");
  //   formData.append("folder", "bills");
  //   setButtonLoading(true);
  //   axios("https://api.cloudinary.com/v1_1/dtu9gszzu/image/upload", {
  //     method: "POST",
  //     data: formData,
  //   })
  //     .then((data) => {
  //       setcloudinaryURL(data?.data?.secure_url);
  //       console.log(data?.data?.secure_url);
  //       let Textdata = JSON.stringify({
  //         messaging_product: "whatsapp",
  //         to: `91${singleBill?.customerId?.customerNumber}`,
  //         type: "template",
  //         template: {
  //           name: "hello_world",
  //           language: {
  //             code: "en_US",
  //           },
  //         },
  //       });
  //       axios("https://graph.facebook.com/v17.0/104365256062975/messages", {
  //         data: Textdata,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${REACT_APP_BUSINESS_TOKEN}`,
  //         },
  //         method: "POST",
  //       });
  //     })
  //     .then((data) => {
  //       console.log(cloudinaryURL);
  //       let body = {
  //         messaging_product: "whatsapp",
  //         recipient_type: "individual",
  //         to: `91${singleBill?.customerId?.customerNumber}`,
  //         type: "image",
  //         image: {
  //           link: cloudinaryURL,
  //         },
  //       };
  //       axios("https://graph.facebook.com/v17.0/104365256062975/messages", {
  //         data: body,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${REACT_APP_BUSINESS_TOKEN}`,
  //         },
  //         method: "POST",
  //       });
  //     })
  //     .then(() => {
  //       toast.success("Bill Sent Successfully", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: false,
  //         draggable: false,
  //         progress: false,
  //         theme: "light",
  //       });
  //       setButtonLoading(false);
  //       console.log(cloudinaryURL);

  //     })
  //     .catch((error) => {
  //       console.error("Error uploading image to Cloudinary:", error);
  //     });
  // };

  const uploadToCloudinary = (dataImageUrl) => {
    const blob = dataURLToBlob(dataImageUrl);
    const file = new File([blob], "image.png");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dva9i9vs");
    formData.append("folder", "bills");
    setButtonLoading(true);
    axios("https://api.cloudinary.com/v1_1/dtu9gszzu/image/upload", {
      method: "POST",
      data: formData,
    })
      .then(async (data) => {
        setcloudinaryURL(data?.data?.secure_url);
        console.log(data?.data?.secure_url);
        const phoneNumber = `+91${singleBill?.customerId?.customerNumber}`;
        const message = `*Shop Name*: ${singleBill?.businessId?.businessName } \n*Grandtotal* :${singleBill?.grandtotal - singleBill?.discount}    \n*Your Bill*: ${data?.data?.secure_url}`;

        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.open(url, "_blank");

        // toast.success("Bill Sent Successfully", {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: false,
        //   draggable: false,
        //   progress: false,
        //   theme: "light",
        // });
        setButtonLoading(false);
        console.log(cloudinaryURL);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const convertToImage = () => {
    html2canvas(bill.current)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        uploadToCloudinary(imgData);
        // You can use the imgData URL as needed, e.g., save it to state or send it to the server
      })
      .catch((error) => {
        console.error("Error converting div to image:", error);
      });
  };

  const contentRef = useRef(null);
  const bill = useRef(null);
  useEffect(() => {
    if (id) {
      setLoading(true);
      let params = new URLSearchParams(location.search);
      setHandleShare(Boolean(params.get("show")));
      setHandleShare(Boolean(params.get("show")));
      try {
        axios(`https://khatabook-one.vercel.app/getcustomerbill/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            setSingleBill(res?.data?.response);
            console.log(res?.data?.response);
            setLoading(false);
            setitemsSingeBill(res?.data?.response?.items);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  // console.log(business);

  return (
    <>
      {loading && (
        <PageLoader
          className={
            "fixed z-[500] w-full h-screen top-0  bg-black bg-opacity-20 text-center "
          }
        />
      )}
      <div
        className={`min-h-screen h-fit  ${
          isDarkMode ? "bg-gray-800 " : "bg-white "
        }`}
      >
        {!handleShare && (
          <div ref={contentRef}>
            <Sidebar />
            <Link
              to={`/customer-details/${singleBill?.customerId?._id}`}
              className={`flex items-center justify-center w-12 h-12 rounded-full border mt-3 ml-3  ${
                isDarkMode ? "text-white" : "text-gray-800 "
              } `}
            >
              <div className="  text-3xl ">
                <BiArrowBack />
              </div>
            </Link>
          </div>
        )}
        <div
          id="myDiv"
          ref={bill}
          className={`container mx-auto  md:w-[70%] w-screen py-4  `}
        >
          <div className="bg-white rounded-lg shadow-lg pb-4">
            <div className="flex justify-between bg-blue-500 text-white px-6 py-4 items-center">
              <h1 className="text-2xl font-bold">Bill</h1>
              <p className="">
                Date:{" "}
                {moment(singleBill?.createdAt).format("DD MMM, YYYY  h:mm a")}
              </p>
            </div>
            <div className="flex justify-between md:px-6 px-2 py-4">
              <div className="w-5/12">
                <span>
                  <h2 className="text-xl font-bold">
                    {singleBill?.businessId?.businessName}
                  </h2>
                </span>
                <h2 className="font-bold">
                  {singleBill?.businessId?.businessType}
                </h2>
                <p className="text-sm">{singleBill?.businessId?.location}</p>

                <p className="text-sm">{singleBill?.businessId?.phoneNo}</p>
              </div>
              <div className="w-2/12 text-center flex justify-center items-center">
                <img
                  src={singleBill?.businessId?.businessLogo}
                  className="rounded-full w-16  h-16 text-center"
                  alt="Shop Logo"
                />
              </div>

              <div className="w-5/12 text-end">
                <h2 className="text-xl font-bold ">
                  {singleBill?.customerId?.customerName}
                </h2>
                <p>{singleBill?.customerId?.customerNumber}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-200 text-gray-800 text-center">
                  <tr className=" border-black">
                    <th className="sticky left-0 w-20  border py-2 px-4  bg-gray-200 ">
                      Items
                    </th>
                    <th className="  py-2 px-4 border-x">Qty</th>
                    <th className="  py-2 px-4 border-x">Individual Price</th>
                    <th className="  py-2 px-4 border-x">Total </th>
                  </tr>
                </thead>
                <tbody>
                  {itemsSingeBill?.map((items) => {
                    return (
                      <tr className="text-center  border-black ">
                        <td className="sticky left-0 w-2/5  bg-white px-2 border whitespace-nowrap ">
                          {items?.item}
                        </td>
                        <td className=" py-2  w-1/5 border-x whitespace-nowrap">
                          {items?.qty}
                          {items?.unit}
                        </td>
                        <td className=" py-2  w-1/5 border-x  whitespace-nowrap text-sm">
                          {items?.individualPrice} Rs
                        </td>
                        <td className=" py-2 w-1/5 border-x whitespace-nowrap text-sm">
                          {items?.total} Rs
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-200 text-gray-800 ">
                  <tr className="w-[50vw]">
                    <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                      Subtotal:
                    </td>
                    <td className="py-2 text-sm">
                      {singleBill?.grandtotal} Rs
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                      Discount:
                    </td>
                    <td className="py-2  border-b border-black text-sm">
                      {singleBill?.discount} Rs
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                      Total:
                    </td>
                    <td className="py-2  font-bold text-sm ">
                      {singleBill?.grandtotal - singleBill?.discount} Rs
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                      Paid:
                    </td>
                    <td className="py-2  font-bold text-sm text-green-600">
                      {singleBill?.paid} Rs
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right py-2 px-4 font-bold ">
                      UnPaid:
                    </td>
                    <td className="py-2  font-bold text-sm text-red-500">
                      {singleBill?.grandtotal -
                        singleBill?.paid -
                        singleBill?.discount}{" "}
                      Rs
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="px-4 pt-4 ">
              <p className="text-center font-bold text-xl">
                Thank You, Visit Again!
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4 mr-6 mb-3  gap-x-4 ">
            {!handleShare && (
              <button
                onClick={(e) => {
                  document.title = `CONT-O | - ${singleBill?.customerId?.customerName}`;
                  e.target.style.opacity = 0;
                  contentRef.current.style.display = "none";
                  window.print();
                  e.target.style.opacity = 1;
                  contentRef.current.style.display = "";
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-28 flex gap-4 justify-center items-center"
              >
                <AiOutlinePrinter /> Print
              </button>
            )}
            {handleShare && (
              <button
                onClick={(e) => {
                  document.title = `CONT-O | ${singleBill?.customerId?.customerName}`;
                  e.target.style.opacity = 0;
                  convertToImage();
                  e.target.style.opacity = 1;
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-28 flex gap-4 justify-center items-center"
              >
                {!buttonLoading ? (
                  <p className="flex items-center gap-x-2">
                    <AiOutlinePrinter />
                    Share{" "}
                  </p>
                ) : (
                  <Spinner />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShowSingleBill;
