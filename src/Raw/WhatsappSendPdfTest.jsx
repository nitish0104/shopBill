// // import React from 'react';

// // const PDFSender = () => {
// //   const handleClick = () => {
// //     const pdfURL = 'https://www.africau.edu/images/default/sample.pdf';
// //     const phoneNumber = '+917972930804'; // Replace with the recipient's phone number

// //     const encodedMessage = encodeURIComponent(`Here is the PDF file: ${pdfURL}`);
// //     const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

// //     window.open(whatsappURL);
// //   };

// //   return (
// //     <button onClick={handleClick}>Send PDF via WhatsApp</button>
// //   );
// // };

// // export default PDFSender;

// import React, { useRef } from "react";
// import html2canvas from "html2canvas";

// const DivToImage = () => {
//   const divRef = useRef(null);

//   const dataURLToBlob = (dataUrl) => {
//     const byteString = atob(dataUrl.split(',')[1]);
//     const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
  
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
  
//     return new Blob([ab], { type: mimeString });
//   };
  
//   const uploadToCloudinary = (dataImageUrl) => {
    
//     const blob = dataURLToBlob(dataImageUrl);
//     const file = new File([blob], 'image.png');
//     const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "dva9i9vs"); 
//       formData.append("folder", "ShopConnectLogo"); 

//       fetch('https://api.cloudinary.com/v1_1/dtu9gszzu/image/upload', {
//     method: 'POST',
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Image uploaded to Cloudinary:', data);
//       // Handle the Cloudinary response as needed
//     })
//     .catch((error) => {
//       console.error('Error uploading image to Cloudinary:', error);
//     });
//   };
  
//   const convertToImage = () => {
//     html2canvas(divRef.current)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         uploadToCloudinary(imgData)
//         // You can use the imgData URL as needed, e.g., save it to state or send it to the server
//       })
//       .catch((error) => {
//         console.error("Error converting div to image:", error);
//       });
//   };

//   return (
//     <div>
//       <div ref={divRef}>
//         {/* Content inside this div will be converted to an image */}
//         <h1>Hello, World!</h1>
//         <p>This is some text inside the div.</p>
//       </div>
//       <button onClick={convertToImage}>Convert to Image</button>
//     </div>
//   );
// };

// export default DivToImage;
