import { useState } from "react";
import { useForm } from "react-hook-form";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { UploaderInputs } from "@components/index";
import { Modal } from "antd";

import { Button } from "@components";
import { Ckeditor } from "@components/FormControls";
import { ImageIcon } from "@components/UI";
import { createInspections } from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";

export default function InspectionForm() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState("");
  const [receivedData, setReceivedData] = useState([]);
  const [rows, setRows] = useState([{ id: 0 }]);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addRow = () => {
    const lastRowId = rows.at(-1).id;
    setRows((rows) => [...rows, { id: lastRowId + 1 }]);
    // Ensure new row data is initialized in receivedData
    setReceivedData((prevData) => [...prevData, ""]);
  };

  const handleDataChange = (dataToMap, id) => {
    console.log("FINAL TO RECIV", dataToMap, id);
    // Update the receivedData based on the id
    setReceivedData((prevData) => {
      const newData = [...prevData];
      newData[id] = dataToMap;
      return newData;
    });
  };

  const handleDelete = () => {
    setRows((rows) => rows.filter((row) => row.id !== rowToDelete));
    setReceivedData((prevData) =>
      prevData.filter((_, index) => index !== rowToDelete)
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirmDelete = (id) => {
    setRowToDelete(id);
    setIsModalVisible(true);
  };

  const onSubmit = async function (data) {
    console.log("DATA TO SUBMIT", data, receivedData);
    let imagesArrayConst = [];
    const formatedData = receivedData.reduce((dataToLoad, curr, index) => {
      const images = data[`attachment-${index}`];
      if (images.length > 0) {
        imagesArrayConst = [];
        for (const file of data[`attachment-${index}`]) {
          imagesArrayConst.push(file);
        }
      } else imagesArrayConst = [];

      return [
        ...dataToLoad,
        { inspection: curr, attachment: imagesArrayConst },
      ];
    }, []);

    const dataToLoad = { inspections: formatedData };
    console.log("FINAL ONE", dataToLoad);

    const resp = createInspections(formatedData, id);
    console.log(resp);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
              className=" md:col-start-1 col-span-2 md:col-span-1"
              onGetHtml={(data) => handleDataChange(data, index)}
              initialData={initialData}
              id={index}
            />
            <UploaderInputs
              wrapperClass="col-span-2 md:col-span-1"
              name={`attachment-${index}`}
              register={register}
              id={`attachment-${index}`}
              icon={<ImageIcon />}
              require={false}
            />
          </div>
        ))}
        <Button variant="gradient" type="submit">
          Save
        </Button>
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
