import { Input, Button } from "@components";
import { CkeditorComponent } from "@components/index";
import React, { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal } from "antd"; // Assuming you use antd for the modal
import { FaRegEdit } from "react-icons/fa";
const InspectionSidebarForm = () => {
  const [rows, setRows] = useState([{}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const confirmDelete = (index) => {
    setRowToDelete(index);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setRows(rows.filter((_, index) => index !== rowToDelete));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-base uppercase">Page Content</h2>
        <Button className="px-4 py-2 bg-white rounded-md font-medium">
          View Page
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-4 cursor-pointer">
        <span className="font-semibold">Inspection</span>
        <FaRegEdit />
      </div>
      <div className="p-8 bg-white flex-grow shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  rounded-lg dark:border-gray-700">
        {rows.map((row, index) => (
          <div key={index} className="flex justify-between  mb-4">
            <TfiAlignJustify className="w-16 h-full mt-2" />
            <Input type="file" className="mb-4 mx-4" applyMarginBottom={true} />
            <CkeditorComponent className="mx-4" />
            <RiDeleteBin5Line
              className="w-16 h-full mt-2 text-red-500 cursor-pointer"
              onClick={() => confirmDelete(index)}
            />
          </div>
        ))}
        <Button
          onClick={addRow}
          className="px-2 py-1 rounded-md text-gray-700 mt-4 border border-gray-300 hover:bg-gray-300 bg-white "
        >
          Add Item
        </Button>

        <Modal
          title="Confirm Delete"
          visible={isModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>
      </div>
    </>
  );
};

export default InspectionSidebarForm;
