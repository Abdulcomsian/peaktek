import { TextBox, SelectBox } from "@components/FormControls";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddMaterialForm = ({ values, setFieldValue, className }) => {
  const handleAddRow = () => {
    setFieldValue("materials", [
      ...values,
      { material: "", quantity: "", color: "", order_key: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = values?.filter((_, i) => i !== index);
    setFieldValue("materials", updatedRows);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedRows = values?.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setFieldValue("materials", updatedRows);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="hidden md:flex font-poppins text-sm font-medium mb-2">
        <div className="flex-1 px-1">Material</div>
        <div className="flex-1 px-1">Quantity</div>
        <div className="flex-1 px-1">Color</div>
        <div className="flex-1 px-1">Order Key</div>
        <div className="w-[4rem]">Action</div>
      </div>

      {values?.map((row, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center mb-4 space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="w-full sm:flex-1">
            <TextBox
              type="text"
              value={row.material || ""}
              placeholder="Enter Material"
              onChange={(e) =>
                handleMaterialChange(index, "material", e.target.value)
              }
              className="w-full"
            />
          </div>
          <div className="w-full sm:flex-1">
            <TextBox
              type="number"
              value={row.quantity || ""}
              placeholder="Enter Quantity"
              onChange={(e) =>
                handleMaterialChange(index, "quantity", e.target.value)
              }
              className="w-full"
            />
          </div>
          <div className="w-full sm:flex-1">
            <SelectBox
              value={row.color || ""}
              placeholder="Select Color"
              onChange={(value) => handleMaterialChange(index, "color", value)}
              className="w-full"
              options={[
                { label: "Red", value: "red" },
                { label: "Blue", value: "blue" },
                { label: "Green", value: "green" },
                // Add more color options as needed
              ]}
            />
          </div>
          <div className="w-full sm:flex-1">
            <TextBox
              type="text"
              value={row.order_key || ""}
              placeholder="Enter Order Key"
              onChange={(e) =>
                handleMaterialChange(index, "order_key", e.target.value)
              }
              className=""
            />
          </div>
          <div className="flex items-center justify-between w-full md:w-[4rem] text-center flex-shrink-0">
            <span className="font-medium text-sm  md:hidden">Action</span>
            {index === 0 ? (
              <button
                type="button"
                onClick={handleAddRow}
                className="bg-green-100 hover:bg-green-500 text-green-600 hover:text-white rounded p-2"
              >
                <AiOutlinePlus size={20} className="text-inherit" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleDeleteRow(index)}
                className="bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded p-2"
              >
                <RiDeleteBin6Line size={20} className="text-inherit" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddMaterialForm;
