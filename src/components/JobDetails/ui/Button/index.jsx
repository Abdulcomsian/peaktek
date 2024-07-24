import React from "react";

const Button = ({ children, type, disabled, onClick, className }) => {
  return (
    <button
      type={type ? type : "button"} // If type prop is empty, default to "button"
      onClick={onClick}
      disabled={disabled}
      className={`font-poppins font-medium text-base rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
