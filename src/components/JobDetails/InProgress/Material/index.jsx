import { TextBox } from "@components/FormControls";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const MaterialForm = ({ values, setFieldValue }) => {
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
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="font-poppins text-sm font-medium text-left px-1">
              Material
            </th>
            <th className="font-poppins text-sm font-medium">Damaged</th>
            <th className="font-poppins text-sm font-medium text-left px-2">
              Notes
            </th>
            <th className="font-poppins text-sm font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {values.map((row, index) => (
            <tr key={index} className="">
              <td className="py-2">
                <TextBox
                  type="text"
                  value={row.material}
                  placeholder="Ice & Water"
                  onChange={(e) =>
                    handleMaterialChange(index, "material", e.target.value)
                  }
                  className="w-full max-w-sm"
                />
              </td>
              <td className="px-8 py-2 text-center">
                <input
                  type="checkbox"
                  checked={row.damaged}
                  onChange={(e) =>
                    handleMaterialChange(index, "damaged", e.target.checked)
                  }
                  className="h-5 w-5"
                />
              </td>
              <td className="py-2">
                <TextBox
                  type="text"
                  value={row.notes}
                  placeholder="Type"
                  onChange={(e) =>
                    handleMaterialChange(index, "notes", e.target.value)
                  }
                  className="w-full max-w-sm p-2 rounded"
                />
              </td>
              <td className="px-4 py-2 text-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialForm;
