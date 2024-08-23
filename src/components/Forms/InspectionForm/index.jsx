import { useState } from "react";
import { useForm } from "react-hook-form";
import { TfiAlignJustify } from "react-icons/tfi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { UploaderInputs } from "@components/index";
import { Modal } from "antd";

import { Button } from "@components";
import { Ckeditor } from "@components/FormControls";
import { ImageIcon } from "@components/UI";
import { createInspections, getInspection } from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function InspectionForm() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [rows, setRows] = useState([{ id: 0 }]);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async function () {
      const resp = await getInspection(id);
      console.log(resp);
      if (resp.status >= 200 && resp.status < 300) {
        setRows(resp.data.data);
        setInitialData(resp.data.data.map((dataToMap) => dataToMap.inspection));
        return resp.data.data.map((dataToMap) => {});
      }
    },
  });

  console.log(initialData);

  const addRow = () => {
    const lastRowId = rows.at(-1).id;
    setRows((rows) => [...rows, { id: lastRowId + 1 }]);
    // Ensure new row data is initialized in receivedData
    setReceivedData((prevData) => [...prevData, ""]);
  };

  const handleDataChange = (dataToMap, id) => {
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
    console.log("Submition form", data);
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
    console.log("dataa", dataToLoad);

    let form = new FormData();
    dataToLoad.inspections.forEach((item, index) => {
      form.append(`data[${index}][inspection]`, item.inspection);
      let attachment = item.attachment;
      for (let i = 0; i < attachment.length; i++) {
        form.append(`data[${index}][attachment][${i}]`, attachment[i]);
      }
    });

    const resp = await createInspections(form, id);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
    }
  };

  const onerror = function (data) {
    console.log(data);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit, onerror)}>
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
              onChange={(data) => handleDataChange(data, index)}
              initialData="test"
              value={initialData.at(index)}
              id={index}
            />
            <UploaderInputs
              wrapperClass="col-span-2 md:col-span-1"
              name={`attachment-${index}`}
              register={register}
              id={`attachment-${index}`}
              icon={<ImageIcon />}
              require={false}
              fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
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
