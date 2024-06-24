import React from "react";

const Button = ({ children, type, className, onClick, disabled, variant }) => {
  console.log(variant);
  const base = `flex items-center justify-center gap-1 mb-3 text-white font-medium text-base  border border-transparent rounded-full px-3 py-2 mr-3 group`;

  const variantStyle = {
    gradient:
      base + "bg-gradient-to-r from-blue-400 to-blue-800 bg-custom-gradient",
  };
  return (
    <button
      type={type ? type : "button"} // If type prop is empty, default to "button"
      className={`${variantStyle[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
