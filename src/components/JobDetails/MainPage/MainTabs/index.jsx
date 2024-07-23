import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { MobileContent } from "@components/JobDetails";
export default function MainTabs({ className }) {
  const [activeTab, setActiveTab] = useState("summary");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (activeTab === path) {
      setActiveTab(null); // Toggle off if the same tab is clicked again
    } else {
      setActiveTab(path);
      navigate(path);
    }
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
      id: 3,
      text: "Adjustor Meeting",
      path: "adjustor-meeting",
    },
    {
      id: 4,
      text: "Overturn",
      path: "overturn",
    },
    {
      id: 5,
      text: "Approved",
      path: "approved",
    },
  ];
  return (
    <nav
      className={`flex flex-col align-baseline md:flex-row gap-6 ${className} `}
      aria-label="Tabs"
    >
      {buttonsData?.map((btn) => (
        <>
          <button
            key={btn?.id}
            className={`flex justify-between items-center focus:outline-none  ${
              activeTab === btn?.path ? "text-black" : "text-gray-500"
            }`}
            onClick={() => handleNavigation(`${btn?.path}`)}
            aria-current="page" // or "false" depending on the current tab
          >
            {btn?.text}
            {activeTab === btn?.path ? (
              <FiChevronDown className="w-5 h-5 block md:hidden" />
            ) : (
              <FiChevronRight className="w-5 h-5 block md:hidden" />
            )}
          </button>
          {activeTab === btn?.path && (
            <div className="md:hidden">
              <MobileContent path={btn?.path} />
            </div>
          )}
        </>
      ))}
    </nav>
  );
}
