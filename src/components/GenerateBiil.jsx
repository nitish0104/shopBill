import React from "react";
import html2canvas from "html2canvas";
const GenerateBiil = ({ contentRef }) => {
  const handleDownload = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "download.png";
      link.click();
    });
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleDownload}
      >
        Generate Bill
      </button>
    </>
  );
};

export default GenerateBiil;
