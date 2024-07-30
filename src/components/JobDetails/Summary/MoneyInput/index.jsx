import React from "react";
import { MoneyIcon } from "@components/UI";
const MoneyInput = ({ id, placeholder, name, type, value, onChange }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
        <MoneyIcon className="w-4" />
      </div>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        className="bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 text-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded focus:outline-none w-20 ps-7 p-[2px]"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default MoneyInput;
