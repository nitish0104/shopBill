import React, { useState } from "react";
import Input from "../components/Input";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBusiness } from "react-icons/md";
import { TbReceiptTax } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { TiBusinessCard } from "react-icons/ti";

import LayoutMain from "../components/layout/LayoutMain";
import { User, Save, Type } from "react-feather";
const ProfilePage = () => {
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [location, setLocation] = useState("");
  return (
    <>
      <div className="min-h-screen h-auto">
        <LayoutMain
          className={
            "flex justify-center min-h-screen h-fit items-center flex-col bg-gray-900"
          }
        >
          <h2 className="text-3xl text-white mb-6 flex items-center">
            <TiBusinessCard className="inline-block mr-2 text-4xl" />
            Profile Setup
          </h2>
          <form
            action=""
            className="flex flex-col justify-center items-center  w-[80vw]  rounded-lg "
          >
            <div className="flex flex-col gap-y-2 items-center">
              <div className="">
                <Input
                  type={"file"}
                  accept={"image/*"}
                  className={
                    "h-[40vw] w-[40vw] rounded-full bg-gray-700 md:h-[15vw] md:w-[15vw] border-2 border-black"
                  }
                  label={"Upload your logo"}
                  value={logo}
                  onChange={(e) => {
                    setLogo(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-medium "
                >
                  <User className="inline-block mr-1" />
                  Name
                </label>
                <div className="relative">
                  <Input
                    type={"text"}
                    placeholder={"Enter your Name"}
                    className={
                      "w-full py-2 px-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    }
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <User className="absolute top-2 right-3 text-gray-500" />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="businessType"
                  className="block text-white text-sm font-medium "
                >
                  <Type className="inline-block mr-1" />
                  Business Type
                </label>
                <div className="relative">
                  <Input
                    type={"text"}
                    placeholder={"Enter your Business Type"}
                    value={businessType}
                    className={
                      "w-full py-2 px-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    }
                    onChange={(e) => {
                      setBusinessType(e.target.value);
                    }}
                  />
                  <Type className="absolute top-2 right-3 text-gray-500" />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="businessName"
                  className="block text-white text-sm font-medium "
                >
                  <MdOutlineBusiness className="inline-block mr-1 text-2xl" />
                  Business Name
                </label>
                <div className="relative">
                  <Input
                    type={"text"}
                    placeholder={"Enter your Business Name"}
                    value={businessName}
                    className={
                      "w-full py-2 px-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    }
                    onChange={(e) => {
                      setBusinessName(e.target.value);
                    }}
                  />
                  <MdOutlineBusiness className="absolute top-2 right-3  text-2xl text-gray-500" />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="gstNumber"
                  className="block text-white text-sm font-medium "
                >
                  <TbReceiptTax className="inline-block mr-1 text-2xl" />
                  Gst Number
                </label>
                <div className="relative">
                  <Input
                    type={"text"}
                    placeholder={"Enter your Gst Number"}
                    value={gstNumber}
                    className={
                      "w-full py-2 px-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    }
                    onChange={(e) => {
                      setGstNumber(e.target.value);
                    }}
                  />
                  <TbReceiptTax className="absolute top-2 right-3  text-2xl text-gray-500" />
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="location"
                  className="block text-white text-sm font-medium "
                >
                  <GoLocation className="inline-block mr-1 text-2xl" />
                  Location
                </label>
                <div className="relative">
                  <Input
                    type={"text"}
                    placeholder={"Enter your Locstion"}
                    value={location}
                    className={
                      "w-full py-2 px-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    }
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                  <GoLocation className="absolute top-2 right-3  text-2xl text-gray-500" />
                </div>
              </div>
            </div>


            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 text-2xl  px-4 rounded-lg ${
                name ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!name}
            >
              <Save className="inline-block mr-1" />
              Save
            </button>
          </form>
        </LayoutMain>
      </div>
    </>
  );
};

export default ProfilePage;
