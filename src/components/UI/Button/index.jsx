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
  console.log(variant);
  const base = `flex items-center justify-center gap-1 text-white font-medium text-base  border border-transparent rounded-full px-3 py-2 group `;

  const variantStyle = {
    gradient:
      base + "bg-gradient-to-r from-blue-400 to-blue-800 bg-custom-gradient",
    danger: base + "bg-red-500 text-white hover:bg-red-400",
    accent: base + "bg-green-500 text-white hover:bg-green-400",
  };

  if (to) {
    return (
      <Link
        className={`${variantStyle[variant]} ${className}`}
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
      className={`${variantStyle[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
