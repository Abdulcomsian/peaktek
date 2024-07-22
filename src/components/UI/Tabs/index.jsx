import { setActiveTab } from "@store/slices/tabsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Tabs({ items }) {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state?.tabs?.activeTab);
  const handleActiveTab = (id) => {
    dispatch(setActiveTab(id));
  };

  return (
    <div className="flex mb-4">
      {items?.map((item) => (
        <div
          className={`icon-container cursor-pointer  border-b border-gray-200 px-4 py-2 ${
            activeTab === item.id
              ? "bg-bluish text-black border-indigo-600"
              : "text-black text-opacity-30"
          } hover:bg-bluish hover:text-black hover:border-indigo-600`}
          key={item?.id}
          onClick={() => handleActiveTab(item?.id)}
        >
          {item?.icon}
          <span> {item?.title}</span>
        </div>
      ))}
    </div>
  );
}
