import React, { useState } from "react";
import LayoutManin from "../../components/layout/LayoutManin";
import Input from "../../components/Input/Input";
import ImageUploadComponent from "../../components/Input/ImageInput";
import { ContextAuth } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage1 = () => {
  const { setProfile } = ContextAuth();
  const navigate = useNavigate();
  const [formState, setformState] = useState({
    logo: "",
    BusinessName: "",
    BusinessType: "",
    gstNo: "",
  });

  const handleChange = (e) => {
    setformState((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  setProfile(formState);

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(formState);
    
    navigate('/main')
    // toast.success("Profile Created", {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: false,
    //   pauseOnHover: false,
    //   draggable: false,
    //   progress: false,
    //   theme: "light",
    // });
  };

  return (
    <div className={"min-h-screen h-fit"}>
      <LayoutManin>
        <div className="container mx-auto h-screen py-8 mt-6  flex-col justify-center items-center">
          <div className="text-center text-3xl font-bold text-white ">
            Business Profile
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-md py-8 bg-blue-100 shadow-lg rounded-lg  px-4 mx-8 mt-8 m-auto"
          >
            <ImageUploadComponent></ImageUploadComponent>
            <Input
              type={"input"}
              id={"BusinessName"}
              Label={"Business Name"}
              placeholder={"Enter your Business Type"}
              value={formState.BusinessName}
              onChange={handleChange}
            ></Input>
            <Input
              type={"input"}
              id={"BusinessType"}
              Label={"Business Type"}
              placeholder={"Enter your Business Name"}
              value={formState.BusinessType}
              onChange={handleChange}
            ></Input>
            <Input
              type={"input"}
              id={"gstNo"}
              Label={"GST No"}
              placeholder={"Enter your GST  Number"}
              value={formState.gstNo}
              onChange={handleChange}
            ></Input>

            <div>

            <button
              type="button"
              onClick={() => {
                handleSubmit(formState);
              }}
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