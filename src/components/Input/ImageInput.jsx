import React, { useState } from "react";
import { ContextAuth } from "../../context/Context";
import axios from "axios";
import Spinner from "../Spinner";

const ImageUploadComponent = ({ businessLogo, setformState, formState , isEditable}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [loading, setLoading] = useState(false)
  const [upload, setUpload] = useState(true);
  const [publicId, setPublicId] = useState(null);
  const { setLogoUrl } = ContextAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setIsImageSelected(true);
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "dva9i9vs"); 
      formData.append("folder", "ShopConnectLogo"); 

      fetch("https://api.cloudinary.com/v1_1/dtu9gszzu/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(async (data) => {



          await axios("https://khatabook-one.vercel.app/updatebusiness", {
            method: "PATCH",
            data: { businessLogo: data.secure_url },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              setformState({ ...formState, businessLogo: res?.data.response.businessLogo })
            })
          setIsImageSelected(false);
          setLogoUrl(data.secure_url);
          setUpload(false);
          setPublicId(data.public_id);
          setLoading(false)

        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setIsImageSelected(false);
    if (publicId) {
      fetch(`https://api.cloudinary.com/v1_1/dtu9gszzu/image/destroy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_ids: publicId,
          upload_preset: "dva9i9vs", 
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Image deleted:", data);
          setSelectedImage(null);
          setIsImageSelected(false);
          setPublicId(null);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto ">
      <h1 className="text-lg font-bold mb-2 text-center">Business Logo</h1>
      {
        businessLogo ?
          <div className="flex items-center justify-center mb-2">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <label
                htmlFor="uploadImage"
                className="w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
              >
                <img
                  src={isImageSelected ? URL.createObjectURL(selectedImage) : businessLogo}
                  alt="Uploaded Image"
                  className={`w-full h-full object-cover ${isEditable ? 'cursor-pointer' : 'cursor-default'}`}
                />
              </label>
            </div>
          </div>
          :
          <div className="flex items-center justify-center mb-2">
            <label
              htmlFor="uploadImage"
              className="w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                class="bi bi-camera"
                viewBox="0 0 16 16"
                id="IconChangeColor"
              >
                {" "}
                <path
                  d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
                  id="mainIconPathAttribute"
                  filter="url(#shadow)"
                ></path>{" "}
                <path
                  d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
                  id="mainIconPathAttribute"
                ></path>{" "}
                <filter id="shadow">
                  <feDropShadow
                    id="shadowValue"
                    stdDeviation="0"
                    dx="0"
                    dy="0"
                    floodColor="black"
                  ></feDropShadow>
                </filter>
                <filter id="shadow">
                  <feDropShadow
                    id="shadowValue"
                    stdDeviation=".5"
                    dx="0"
                    dy="0"
                    floodColor="black"
                  ></feDropShadow>
                </filter>
                <filter id="shadow">
                  <feDropShadow
                    id="shadowValue"
                    stdDeviation=".5"
                    dx="0"
                    dy="0"
                    floodColor="black"
                  ></feDropShadow>
                </filter>
              </svg>
            </label>
          </div>
      }

      <input
        id="uploadImage"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />


      
      {
        isImageSelected && (
          <div className="flex justify-center items-center">
            <button
              onClick={handleImageUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {!loading ? 'Upload' : <Spinner/>}
            </button>
          </div>
        )
      }
    </div>
  );
};

export default ImageUploadComponent;
