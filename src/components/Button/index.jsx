import React from "react";

const Button = ({ children, className, type, onClick, disabled }) => {
  return (
    <button
      type={type ? type : "button"} // If type prop is empty, default to "button"
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
