import React from "react";
import { TextBox } from "@components/FormControls";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const MaterialForm = ({
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  const handleAddRow = () => {
    setFieldValue("materials", [
      ...values,
      { material: "", damaged: false, notes: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = values.filter((_, i) => i !== index);
    setFieldValue("materials", updatedRows);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedRows = values.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setFieldValue("materials", updatedRows);
  };

  return (
    <div className="overflow-x-auto">
      <div className="hidden md:flex font-poppins text-sm font-medium mb-2">
        <div className="flex-1 px-1">Material</div>
        <div className="flex-1 px-1 flex justify-center">Damaged</div>
        <div className="flex-1 px-1">Notes</div>
        <div className="w-[4rem]">Action</div>
      </div>

      {values.map((row, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start mb-4  md:space-y-0 md:space-x-4"
        >
          <div className="w-full sm:flex-1">
            <TextBox
              type="text"
              name={`materials[${index}].material`}
              value={row.material || ""}
              placeholder="Enter Material"
              onChange={(e) =>
                handleMaterialChange(index, "material", e.target.value)
              }
              onBlur={handleBlur}
              className="w-full"
              error={touched?.[index]?.material && errors?.[index]?.material}
            />
            {touched?.[index]?.material && errors?.[index]?.material && (
              <div className="text-red-500 text-sm mt-1">
                {errors[index].material}
              </div>
            )}
          </div>
          <div className="w-full flex justify-center items-center sm:flex-1">
            <input
              type="checkbox"
              name={`materials[${index}].damaged`}
              checked={row.damaged}
              onChange={(e) =>
                handleMaterialChange(index, "damaged", e.target.checked)
              }
              className="h-5 w-5"
            />
          </div>
          <div className="w-full sm:flex-1">
            <TextBox
              type="text"
              name={`materials[${index}].notes`}
              value={row.notes || ""}
              placeholder="Enter Notes"
              onChange={(e) =>
                handleMaterialChange(index, "notes", e.target.value)
              }
              onBlur={handleBlur}
              className="w-full"
              error={touched?.[index]?.notes && errors?.[index]?.notes}
            />
            {touched?.[index]?.notes && errors?.[index]?.notes && (
              <div className="text-red-500 text-sm mb-1">
                {errors[index].notes}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between w-full md:w-[4rem] text-center flex-shrink-0">
            <span className="font-medium text-sm md:hidden">Action</span>
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

export default MaterialForm;
