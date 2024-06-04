import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`flex justify-center`}>
      <div className={`w-full  ${className} `}>{children}</div>
    </div>
  );
};

export default Container;
