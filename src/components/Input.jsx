import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  id,
  onChange,
  value,
  className,
  readOnly = false,
  accept,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="pb-[4px] font-semibold text-white text-center">
        {label}
      </label>
      <input
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
        className={`px-3 py-2 rounded-lg border-2 shadow-md outline-none text-white border-gray-300 duration-300  focus:border-gray-400 focus:text-black  ${className} `}
        autoComplete="on"
		required
		accept={accept}
		
      />
    </div>
  );
};

export default Input;
