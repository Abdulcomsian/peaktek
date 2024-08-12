import { Button, Ckeditor, FileInput } from "@components";
import { FormHeader } from "@components/Forms";
import React, { Fragment, useEffect, useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal } from "antd"; // Assuming you use antd for the modal
import { UploaderInputs } from "@components/index";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const Inspection = () => {
  const { id: jobId } = useParams();
  const [receivedData, setReceivedData] = useState("");
  const [rows, setRows] = useState([{ id: 0 }]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [initialData, setInitialData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm({});

  const addRow = () => {
    const lastRowId = rows.at(-1).id;
    setRows((rows) => [...rows, { id: lastRowId + 1 }]);
  };

  const confirmDelete = (id) => {
    setRowToDelete(id);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setRows((rows) => rows.filter((row) => row.id !== rowToDelete));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDataChange = (data) => {
    setReceivedData(data);
  };

  const handleClick = async () => {
    // Perform any action with receivedData
    try {
      setIsLoading(true);
      const resp = await createIntroduction(receivedData, jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
        setInitialData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <FormHeader className="" btnText="View Page" pageTitle="Inspection" />

      <div className="p-8 bg-white flex-grow shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  rounded-lg dark:border-gray-700">
        <form action="">
          {rows.map((row, index) => (
            <div
              className="grid grid-cols-2 md:grid-cols-[90%_10%] gap-y-4 mb-6"
              key={row.id}
            >
              <TfiAlignJustify size="24px" className=" h-full mt-2" />
              <RiDeleteBin5Line
                size="24px"
                className="justify-self-end h-full mt-2 text-red-500 cursor-pointer"
                onClick={() => confirmDelete(row.id)}
              />
              {/* <Ckeditor
                className="col-span-2 md:col-start-1"
                onDataChange={handleDataChange}
                initialData={initialData}
              /> */}
              <UploaderInputs
                wrapperClass="col-span-2"
                name={`attachment-${index}`}
                id={`attachment-${index}`}
                register={register}
              />
            </div>
          ))}
        </form>
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
