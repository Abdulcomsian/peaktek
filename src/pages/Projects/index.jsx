import React, { Fragment } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
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
      link: "/introduction",
      linkText: "Introduction",
    },
    {
      id: 3,
      link: "/inspection",
      linkText: "Inspection",
    },
  ];

  const handleSwitchClick = (e) => {
    console.log("Switch toggled", e);
    e.stopPropagation();
  };

  return (
    <Fragment className="overflow-hidden">
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
            {sidebarData?.map((sidebar) => (
              <li
                className="w-full flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                key={sidebar?.id}
              >
                <Link
                  to={sidebar?.link}
                  className="flex items-center flex-grow"
                >
                  <div className="flex items-center">
                    <TfiAlignJustify />
                    <span className="mx-4">{sidebar?.linkText}</span>
                  </div>
                </Link>
                <Switch className="ml-4" onClick={handleSwitchClick} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="px-6 py-4 sm:ml-64 bg-blue-50 min-h-screen flex flex-col overflow-hidden">
        <div className="flex justify-between">
          <h2 className="text-base uppercase">Page Content</h2>
          <Button className="px-4 py-2 bg-white rounded-md font-medium">
            View Page
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-4 cursor-pointer">
          <span className="font-semibold">Title</span>
          <FaRegEdit />
        </div>

        <div className="p-4 bg-white flex-grow border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Projects;
