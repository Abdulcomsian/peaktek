import React, { Fragment } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Switch } from "antd";
import { Button } from "@components/index";

const Projects = () => {
  const sidebarData = [
    {
      id: 1,
      link: "/projects/title",
      linkText: "Title",
    },
    {
      id: 2,
      link: "/projects/introduction",
      linkText: "Introduction",
    },
    {
      id: 3,
      link: "/projects/inspection",
      linkText: "Inspection",
    },
    {
      id: 4,
      link: "/projects/authorization",
      linkText: "Authorization",
    },
  ];

  const handleSwitchClick = (e) => {
    console.log("Switch toggled", e);
    e.stopPropagation();
  };

  const location = useLocation();

  // Determine active sidebar item based on current pathname
  const getActiveItem = () => {
    for (const sidebar of sidebarData) {
      if (location.pathname.startsWith(sidebar.link)) {
        return sidebar;
      }
    }
    // Return default if no match found (though this scenario shouldn't occur based on provided data)
    return sidebarData[0];
  };

  // Get active sidebar item
  const activeItem = getActiveItem();

  return (
    <Fragment>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <h1 className="text-base font-semibold text-black uppercase">
            Pages
          </h1>
          <p className="text-sm mb-4">
            Choose the page to include in your page
          </p>

          <ul className="space-y-2 font-medium">
            {sidebarData.map((sidebar) => (
              <li
                key={sidebar.id}
                className={`w-full flex justify-between items-center p-2 rounded-lg group ${
                  sidebar === activeItem
                    ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Link
                  to={sidebar.link || "/projects/title"}
                  className="flex items-center flex-grow"
                >
                  <div className="flex items-center">
                    <TfiAlignJustify />
                    <span className="mx-4">{sidebar.linkText}</span>
                  </div>
                </Link>
                <Switch className="ml-4" onClick={handleSwitchClick} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="px-6 py-4 sm:ml-64 bg-blue-50 min-h-screen flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Projects;