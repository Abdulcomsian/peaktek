import React from "react";
import { colors, materials } from "@assets/data";
import { Input, Select } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TableRows = ({
  rowIndex,
  handleInputChange,
  handleSelectChange,
  handleAddSameRow,
  handleDeleteRow,
}) => {
  return (
    <tr>
      <td className="px-2 py-2">
        <Input className="w-full max-w-sm" type="number" size="large" />
      </td>
      <td className="px-2 py-2">
        <Input size="large" type="text" />
      </td>
      <td className="px-2 py-2">
        <Input className="w-full max-w-sm" type="number" size="large" />
      </td>
      <td className="px-2 py-2">
        <Input size="large" type="number" className="w-full max-w-sm" />
      </td>
      <td className="text-center py-2">
        {rowIndex === 0 ? (
          <button
            className="p-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleAddSameRow}
          >
            <FaPlus />
          </button>
        ) : (
          <button
            className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleDeleteRow(rowIndex)}
          >
            <FaMinus />
          </button>
        )}
      </td>
    </tr>
  );
};

export default TableRows;
