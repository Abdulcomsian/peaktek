import React from "react";
import { MoneyIcon } from "@components/UI";
const MoneyInput = ({ label, id }) => {
  return (
    <div className="flex items-center">
      <label for={id} class="mr-1">
        {label}
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
          <MoneyIcon className="w-4 money-icon" />
        </div>
        <input
          type="text"
          id={id}
          class="bg-slate-100 hover:bg-bluish border border-bluish hover:border hover:border-indigo-600 text-indigo-600 hover:placeholder:text-indigo-600 text-sm rounded focus:outline-none w-20 ps-7 p-[2px]"
          placeholder="12345"
        />
      </div>
    </div>
  );
};

export default MoneyInput;
