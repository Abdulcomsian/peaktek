import { Input, Button } from "@components";
import { CkeditorComponent } from "@components/index";
import React, { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal } from "antd"; // Assuming you use antd for the modal

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
    <div>
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
  );
};

export default InspectionSidebarForm;
