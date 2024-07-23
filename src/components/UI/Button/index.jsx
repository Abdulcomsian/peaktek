import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  type,
  className,
  onClick,
  disabled,
  variant,
  to,
}) => {
  const base = `flex items-center justify-center gap-1  text-base rounded-md px-3 py-2 group font-light`;

  const variantStyle = {
    gradient:
      base +
      "bg-gradient-to-br from-[#18FAF8] to-[#2E429B] bg-custom-gradient text-white",
    primaryOutline:
      base + `text-gray-700 text-base  hover:bg-blue-50 border border-blue-200`,
    danger: base + "bg-red-500 text-white hover:bg-red-400",
    accent: base + "bg-green-500 text-white hover:bg-green-400",
    deleteBtn: "p-2 bg-red-200 rounded-md",
  };

  if (to) {
    return (
      <Link
        className={`${variantStyle[variant]} ${
          disabled ? "cursor-not-allowed" : ""
        } ${className}`}
        disabled={disabled}
        to={to}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ? type : "button"} // If type prop is empty, default to "button"
      className={`${variantStyle[variant]} ${className} ${
        disabled ? "cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
