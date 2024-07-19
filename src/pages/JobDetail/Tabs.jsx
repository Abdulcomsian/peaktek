import React from "react";

export default function Tabs() {
  return (
    <div className="flex items-center gap-6">
      <div className="text-gray-500">Summary</div>
      <div className="flex items-center gap-1 text-gray-500">
        Customer Agreement
        <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-xs">
          Completed
        </span>
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        Adjustor Meeting
        <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-xs">
          Completed
        </span>
      </div>
      <div className="text-gray-500">Overturn</div>
      <div className="text-gray-500">Design Meeting</div>
    </div>
  );
}
