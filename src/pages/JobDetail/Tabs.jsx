import React from "react";
import { useNavigate } from "react-router-dom";

export default function Tabs({ className }) {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const buttonsData = [
    {
      id: 1,
      text: "Summary",
      path: "summary",
    },
    {
      id: 2,
      text: "Customer Agreement",
      path: "customer-agreement",
    },
    {
      id: 2,
      text: "Adjustor Meeting",
      path: "adjustor-meeting",
    },
    {
      id: 2,
      text: "Overturn",
      path: "overturn",
    },
    {
      id: 2,
      text: "Approved",
      path: "approved",
    },
  ];
  return (
    <nav className={`flex items-center gap-6 ${className} `} aria-label="Tabs">
      {buttonsData?.map((btn) => (
        <button
          key={btn?.id}
          className="text-gray-500"
          onClick={() => handleNavigation(`${btn?.path}/`)}
          aria-current="page" // or "false" depending on the current tab
        >
          {btn?.text}
        </button>
      ))}
    </nav>
  );
}
