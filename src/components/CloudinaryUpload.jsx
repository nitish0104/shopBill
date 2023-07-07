import React, { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
const CloudinaryUpload = () => {
  // const handleImageUpload = (resultEvent) => {
  //   const { event, info } = resultEvent;
  //   if (event === "success") {
  //     // Access the uploaded image URL
  //     console.log("Image URL:", info.secure_url);
  //     // Do something with the URL (e.g., save it in state or send it to a server)
  //   }
  // };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'dva9i9vs'); // Replace with your actual upload preset
    formData.append('folder', 'ShopConnectLogo'); // Replace with your desired collection name

    fetch('https://api.cloudinary.com/v1_1/dtu9gszzu/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Image URL:', data.secure_url);
        // Do something with the URL (e.g., store it in state, display it, etc.)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      {/* <div>
      <h1>Cloudinary Image Upload</h1>
	  <CloudinaryContext cloudName="dva9i9vs">
      <Image
        cloudName="dtu9gszzu"
        uploadPreset="dva9i9vs"
        // Optional configuration options
        cropping={false}
        gravity="auto"
        croppingAspectRatio={1}
        maxFiles={1}
        onSuccess={handleImageUpload}
      />
	  </CloudinaryContext>
    </div> */}

      <div>
        <h1>Image Upload</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </>
  );
};

export default CloudinaryUpload;
