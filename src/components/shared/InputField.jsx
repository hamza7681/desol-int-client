import { InputBox } from "@/src/styles/shared/InputStyle";
import React from "react";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  value,
  handleChange,
  error,
  touched,
  icon,
  handleBlur,
  setShow,
}) => {
  return (
    <InputBox>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        id={label}
        onBlur={handleBlur}
      />
      {error && touched && <p className="error">{error}</p>}
      {icon && (
        <span className="icon" onClick={() => setShow((prev) => !prev)}>
          {icon}
        </span>
      )}
    </InputBox>
  );
};

export default InputField;
