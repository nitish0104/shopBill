import React from "react";

const LayoutManin = ({ children, className }) => {
  return (
    <div className={`absolute bg-gray-800  w-screen min-h-screen h-fit ${className}`}>{children}</div>
  );
};

export default LayoutManin;
