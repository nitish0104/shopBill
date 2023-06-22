import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  id,
  onChange,
  value,
  name,
  className,
  readOnly = false,
  accept,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor=""
        className="pb-[4px] font-semibold text-white text-center"
      >
        {label}
      </label>
      <input
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        name={name}
        value={value}
        className={`px-3 py-2 rounded-lg border-2 shadow-md outline-none  bg-transparent duration-200     ${className} `}
        autoComplete="on"
        required
        accept={accept}
      />
    </div>
  );
};

export default Input;
