import React from "react";
import { useNavigate } from "react-router-dom";

export default function Tabs() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center gap-6" aria-label="Tabs">
      <button
        className="text-gray-500"
        onClick={() => handleNavigation("/job-details/summary")}
        aria-current="page" // or "false" depending on the current tab
      >
        Summary
      </button>
      <div className="flex items-center gap-1 text-gray-500">
        <button aria-current="false">Customer Agreement</button>
        {/* <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-xs">
          Completed
        </span> */}
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        <button aria-current="false">Adjustor Meeting</button>
        {/* <span className="bg-blue-400 px-3 py-1 rounded-full text-white text-xs">
          Completed
        </span> */}
      </div>
      <button className="text-gray-500" aria-current="false">
        Overturn
      </button>
      <button className="text-gray-500" aria-current="false">
        Design Meeting
      </button>
    </nav>
  );
}
