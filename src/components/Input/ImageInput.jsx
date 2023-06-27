import React, { useState } from "react";

const ImageUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setIsImageSelected(true);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setIsImageSelected(false);
  };

  return (
    <div className="max-w-md mx-auto ">
      <h1 className="text-lg font-bold mb-2 text-center">Business Logo</h1>
      {isImageSelected ? (
        <div className="flex items-center justify-center mb-2">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={selectedImage}
              alt="Uploaded Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-2">
          <label
            htmlFor="uploadImage"
            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M17 8a4 4 0 11-8 0 4 4 0 018 0zm-7 4a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2 5a3 3 0 013-3h8a3 3 0 013 3v1h1a2 2 0 012 2v8a3 3 0 01-3 3H4a3 3 0 01-3-3V8a3 3 0 013-3h1V5zm3-3a1 1 0 00-1 1v1h10V3a1 1 0 00-1-1H5zm1 7a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg> */}

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
                  flood-color="black"
                ></feDropShadow>
              </filter>
              <filter id="shadow">
                <feDropShadow
                  id="shadowValue"
                  stdDeviation=".5"
                  dx="0"
                  dy="0"
                  flood-color="black"
                ></feDropShadow>
              </filter>
              <filter id="shadow">
                <feDropShadow
                  id="shadowValue"
                  stdDeviation=".5"
                  dx="0"
                  dy="0"
                  flood-color="black"
                ></feDropShadow>
              </filter>
            </svg>
          </label>
        </div>
      )}
      <input
        id="uploadImage"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {isImageSelected && (
        <div className="flex justify-center items-center">
          <button
            onClick={handleImageRemove}
            className="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Logo
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
