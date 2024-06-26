import { Button, Ckeditor, FileInput } from "@components";
import { FormHeader } from "@components/Forms";
import React, { Fragment, useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal } from "antd"; // Assuming you use antd for the modal
import { UploaderInputs } from "@components/index";

const Inspection = () => {
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
    <Fragment>
      <FormHeader className="" btnText="View Page" pageTitle="Inspection" />
      <div className="p-8 bg-white flex-grow shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  rounded-lg dark:border-gray-700">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-2 md:grid-cols-[90%_10%] gap-y-4 mb-6"
          >
            <TfiAlignJustify size="24px" className=" h-full mt-2" />
            <RiDeleteBin5Line
              size="24px"
              className="justify-self-end h-full mt-2 text-red-500 cursor-pointer"
              onClick={() => confirmDelete(index)}
            />
            <Ckeditor className="col-span-2 md:col-start-1" />
            <UploaderInputs wrapperClass="col-span-2" />
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
    </Fragment>
  );
};

export default Inspection;
