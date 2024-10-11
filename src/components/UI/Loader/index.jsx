import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ width, height, color = "#FFFFFF" }) => {
  return (
    <RotatingLines
      visible={true}
      height={height}
      width={width}
      color={color}
      strokeColor={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
