import React from "react";

const Button = ({ children, type, disabled, onClick }) => {
  return (
    <button
      type={type ? type : "button"} // If type prop is empty, default to "button"
      onClick={onClick}
      disabled={disabled}
      className="font-poppins font-medium text-base text-white btn-gradient px-4 py-1 rounded-md"
    >
      {children}
    </button>
  );
};

export default Button;
