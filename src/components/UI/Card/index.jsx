import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`px-8 py-6 bg-white flex-grow shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
