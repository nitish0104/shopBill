// import React, { useRef } from 'react';
// import { PDFDocument, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';

// const ShareToWhatsApp = () => {
//   const divRef = useRef(null);

//   const generatePDF = async () => {
//     const { default: pdfFonts } = await import('@react-pdf/fonts');
//     const pdf = await PDFDocument.create();

//     pdf.registerFont(pdfFonts.OpenSans, { normal: 'path-to-your-font/OpenSans-Regular.ttf' });

//     const page = pdf.addPage();
//     const { width, height } = page.getSize();

//     const divContent = divRef.current;
//     const pdfContent = await pdf.text(divContent.innerText, { font: 'Open Sans' });

//     const pageContent = new View();
//     pageContent.children.push(new Text(pdfContent));

//     page.children.push(pageContent);

//     const pdfDataUri = await pdf.saveAsBase64();

//     openWhatsApp(pdfDataUri);
//   };

//   const openWhatsApp = (pdfDataUri) => {
//     const shareUrl = `whatsapp://send?text=${encodeURIComponent(pdfDataUri)}`;
//     window.open(shareUrl, '_blank');
//   };

//   return (
//     <div>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={generatePDF}
//       >
//         Share to WhatsApp
//       </button>

//       <div className="mt-4" ref={divRef}>
//         <table className="table-auto border">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Header 1</th>
//               <th className="border px-4 py-2">Header 2</th>
//               <th className="border px-4 py-2">Header 3</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border px-4 py-2">Data 1</td>
//               <td className="border px-4 py-2">Data 2</td>
//               <td className="border px-4 py-2">Data 3</td>
//             </tr>
//             <tr>
//               <td className="border px-4 py-2">Data 4</td>
//               <td className="border px-4 py-2">Data 5</td>
//               <td className="border px-4 py-2">Data 6</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ShareToWhatsApp;

// import React from "react";

// const ShareContent = () => {
//   const handleShare = () => {
//     const contentToShare = document.getElementById("contentToShare").innerText;
//     const whatsappNumber = "9987274285";
//     const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
//       contentToShare
//     )}`;

//     window.open(url, "_blank");
//   };

//   return (
//     <div>
//       <div id="contentToShare">
//         <table className="border-collapse border border-gray-400">
//           <thead>
//             <tr>
//               <th className="border border-gray-400 p-2">Column 1</th>
//               <th className="border border-gray-400 p-2">Column 2</th>
//               <th className="border border-gray-400 p-2">Column 3</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-gray-400 p-2">Data 1</td>
//               <td className="border border-gray-400 p-2">Data 2</td>
//               <td className="border border-gray-400 p-2">Data 3</td>
//             </tr>
//             <tr>
//               <td className="border border-gray-400 p-2">Data 4</td>
//               <td className="border border-gray-400 p-2">Data 5</td>
//               <td className="border border-gray-400 p-2">Data 6</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
//         onClick={handleShare}
//       >
//         Share via WhatsApp
//       </button>
//     </div>
//   );
// };

// export default ShareContent;

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ShareToWhatsApp = () => {
  const divRef = useRef(null);

  const handleShareClick = () => {
    html2canvas(divRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("content.pdf");

      const whatsappUrl = `https://api.whatsapp.com/send?phone=+919987274285&text=Check out this PDF!`;
      window.open(whatsappUrl);
    });
  };

  return (
    <div>
      <button
        onClick={handleShareClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share via WhatsApp
      </button>
      <div ref={divRef}>
        {/* Your content goes here */}
        <table className="table-auto">
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
            </tr>
            <tr>
              <td>Row 3, Cell 1</td>
              <td>Row 3, Cell 2</td>
              <td>Row 3, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShareToWhatsApp;
