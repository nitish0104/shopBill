import React from "react";

const LayoutManin = ({ children, className }) => {
  return (
    <div className={`absolute bg-gray-800 h-screen w-screen ${className}`}>{children}</div>
  );
};

export default LayoutManin;
