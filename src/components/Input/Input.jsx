import React from "react";
import "./Input.css";

const Input = ({
  Label,
  id,
  placeholder,
  maxLength,
  value,
  onChange,
  className,
  type,
  accept,
}) => {
  return (
    <div>
      <div className="form__group field">
        <input
          id={id}
          onChange={onChange}
          accept={accept}
          value={value}
          maxLength={maxLength}
          type={type}
          className={`form__field ${className}`}
          placeholder={placeholder}
          required={true}
        />
        <label htmlFor="name" className="form__label">
          {Label}
        </label>
      </div>
    </div>
  );
};

export default Input;