import { useState } from "react";
import { useForm } from "react-hook-form";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { UploaderInputs } from "@components/index";
import { Modal } from "antd";

import { Button, Ckeditor, FileInput } from "@components";

export default function InspectionForm() {
  const [initialData, setInitialData] = useState("");
  const [receivedData, setReceivedData] = useState("");
  const [rows, setRows] = useState([{ id: 0 }]);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { register, handleSubmit, formState } = useForm({});

  const addRow = () => {
    const lastRowId = rows.at(-1).id;
    setRows((rows) => [...rows, { id: lastRowId + 1 }]);
  };

  const handleDataChange = (data) => {
    setReceivedData(data);
  };

  const handleDelete = () => {
    setRows((rows) => rows.filter((row) => row.id !== rowToDelete));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirmDelete = (id) => {
    setRowToDelete(id);
    setIsModalVisible(true);
  };

  return (
    <>
      <form action="">
        {rows.map((row, index) => (
          <div
            className="grid grid-cols-2 md:grid-cols-[1fr_1fr] gap-4 mb-6"
            key={row.id}
          >
            <TfiAlignJustify size="24px" className=" h-full mt-2" />
            <RiDeleteBin5Line
              size="24px"
              className="justify-self-end h-full mt-2 text-red-500 cursor-pointer"
              onClick={() => confirmDelete(row.id)}
            />
            <Ckeditor
              className=" md:col-start-1"
              onDataChange={handleDataChange}
              initialData={initialData}
            />
            <UploaderInputs
              wrapperClass=""
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
    </>
  );
}
