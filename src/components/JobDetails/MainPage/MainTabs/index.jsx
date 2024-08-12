import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { MobileContent } from "@components/JobDetails";
import { setActiveTab } from "@store/slices/activeTabSlice";

export default function MainTabs({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useSelector((state) => state.activeTab.activeTab);

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    dispatch(setActiveTab(currentPath));
  }, [location.pathname, dispatch]);

  const handleNavigation = (path) => {
    if (activeTab === path) {
      dispatch(setActiveTab(null)); // Toggle off if the same tab is clicked again
    } else {
      dispatch(setActiveTab(path));
      navigate(path);
    }
  };

  const buttonsData = [
    { id: 1, text: "Summary", path: "summary" },
    { id: 2, text: "Customer Agreement", path: "customer-agreement" },
    { id: 3, text: "Adjustor Meeting", path: "adjustor-meeting" },
    { id: 4, text: "Overturn", path: "overturn" },
    { id: 5, text: "Approved", path: "approved" },
    { id: 6, text: "Scheduling", path: "scheduling" },
    { id: 7, text: "Ready To Build", path: "ready-to-build" },
    { id: 8, text: "In Progress", path: "in-progress" },
    { id: 9, text: "Complete", path: "complete" },
  ];

  return (
    <nav
      className={`flex flex-col align-baseline md:flex-row gap-6 ${className}`}
      aria-label="Tabs"
    >
      {buttonsData.map((btn) => (
        <React.Fragment key={btn.id}>
          <button
            className={`flex justify-between items-center focus:outline-none ${
              activeTab === btn.path ? "text-black" : "text-gray-500"
            }`}
            onClick={() => handleNavigation(btn.path)}
            aria-current="page" // or "false" depending on the current tab
          >
            {btn.text}
            {activeTab === btn.path ? (
              <FiChevronDown className="w-5 h-5 block md:hidden" />
            ) : (
              <FiChevronRight className="w-5 h-5 block md:hidden" />
            )}
          </button>
          {activeTab === btn.path && (
            <div className="md:hidden">
              <MobileContent path={btn.path} />
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
