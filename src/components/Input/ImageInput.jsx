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
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-lg font-bold mb-4 text-black text-center">
        Business Logo
      </h1>
      {isImageSelected ? (
        <div className="flex items-center justify-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={selectedImage}
              alt="Uploaded Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-4">
          <label
            htmlFor="uploadImage"
            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
          >
            <svg
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
