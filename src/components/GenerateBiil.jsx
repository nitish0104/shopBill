import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GenerateBiil = ({ rootElementId, downloadFileName }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };
  return (
    <>
      <button
        className={
          "text-white border-yellow-300 self-center bg-accent rounded-md text-xl px-1 py-3  w-40   "
        }
        onClick={downloadPdfDocument}
      >
        Generate Bill
      </button>
    </>
  );
};

export default GenerateBiil;
