import React from "react";
import "./Input.css";
import { ThemeContextAuth } from "../../context/ThemeContext";

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
  required,
  disabled,
}) => {
  const { isDarkMode } = ThemeContextAuth();
  return (
    <div>
      <div className={`form__group field ${className}`}>
        <input
          id={id}
          onChange={onChange}
          accept={accept}
          value={value}
          maxLength={maxLength}
          type={type}
          className={`form__field `}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        <label htmlFor="name" className="form__label font-semibold text-sm">
          {Label}
        </label>
      </div>
    </div>
  );
};

export default Input;
