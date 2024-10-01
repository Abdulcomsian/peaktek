import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { MobileContent } from "@components/JobDetails";
import { setActiveTab } from "@store/slices/activeTabSlice";

export default function MainTabs({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParam] = useSearchParams();
  const activeTab = useSelector((state) => state.activeTab.activeTab);

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    dispatch(setActiveTab(currentPath));
  }, [location.pathname, dispatch]);

  const handleNavigation = ({ id, path }) => {
    searchParams.set("mainTab", id);
    setSearchParam(searchParams);
    if (activeTab === path) {
      dispatch(setActiveTab(null)); // Toggle off if the same tab is clicked again
    } else {
      dispatch(setActiveTab(path));
      navigate(path);
    }
  };

  const buttonsData = [
    { id: 1, text: "New Leads", path: "summary" },
    { id: 2, text: "Signed Deal", path: "customer-agreement" },
    // { id: 3, text: "Estimate Prepared", path: "estimate-prepared" },
    { id: 4, text: "Adjustor Meeting", path: "adjustor-meeting" },
    { id: 8, text: "Ready To Build", path: "ready-to-build" },
    { id: 7, text: "Build Scheduled", path: "build-scheduled" },
    { id: 6, text: "Approved", path: "approved" },
    // { id: 7, text: "Scheduling", path: "scheduling" },
    { id: 9, text: "In Progress", path: "in-progress" },
    { id: 10, text: "Complete", path: "complete" },
    { id: 11, text: "Final Payment due", path: "final-due-payments" },
    { id: 12, text: "Ready to close", path: "ready-to-close" },
    { id: 13, text: "won & closed", path: "won-closed-jobs" },
  ];

  return (
    <nav
      className={`flex flex-col align-baseline md:flex-row gap-5 py-2 overflow-x-auto ${className}`}
      aria-label="Tabs"
    >
      {buttonsData.map((btn) => (
        <React.Fragment key={btn.id}>
          <button
            className={`flex justify-between items-center focus:outline-none min-w-fit ${
              activeTab === btn.path
                ? "font-bold text-[#2a6eb0]"
                : "text-gray-700"
            }`}
            onClick={() => handleNavigation(btn)}
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
