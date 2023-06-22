import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Input from "../../components/Input/Input";
import ImageUploadComponent from "../../components/Input/ImageInput";
import { ContextAuth } from "../../context/Context";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage1 = () => {
  const { updateUserDetails } = ContextAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logo: "",
    BusinessName: "",
    BusinessType: "",
    gstNo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails(formData);
    navigate("/dashboard");
    // Navigate to the next page
    // You can handle navigation logic here using the navigate function
  };

  return (
    <div className="h-screen overflow-hidden ">
      <LayoutManin>
        <div className="md:mx-auto  h-screen  flex  flex-col justify-center bg-gray-800 items-center transition-opacity duration-500 ease-in delay-500">
          <div className="text-center text-3xl font-bold text-white ">
            Business Profile
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-sm w-[85%] md:w-[40%] py-8 bg-blue-100 shadow-lg rounded-lg  px-4  mt-8 mx-auto  "
          >
            <ImageUploadComponent></ImageUploadComponent>
            <Input
              type={"input"}
              name={"BusinessName"}
              id={"BusinessName"}
              Label={"Business Name"}
              placeholder={"Enter your Business Type"}
              value={formData.BusinessName}
              onChange={handleChange}
            ></Input>
            <Input
              type={"input"}
              name={"BusinessType"}
              id={"BusinessType"}
              Label={"Business Type"}
              placeholder={"Enter your Business Name"}
              value={formData.BusinessType}
              onChange={handleChange}
            ></Input>
            <Input
              type={"input"}
              name={"gstNo"}
              id={"gstNo"}
              Label={"GST No"}
              placeholder={"Enter your GST  Number"}
              value={formData.gstNo}
              onChange={handleChange}
            ></Input>

            <div>
              <button
                type="submit"
                // onClick={() => {
                //   handleSubmit(formData);
                // }}
                className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Complete Profile
              </button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </div>
          </form>
        </div>
      </LayoutManin>
    </div>
  );
};

export default ProfilePage1;
