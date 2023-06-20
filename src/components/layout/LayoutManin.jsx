import React from "react";

const LayoutManin = ({ children, className }) => {
  return (
    <div className={`absolute bg-slate-100 w-screen min-h-screen h-fit ${className}`}>{children}</div>
  );
};

export default LayoutManin;
