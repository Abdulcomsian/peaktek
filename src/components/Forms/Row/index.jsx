import React from "react";
import { colors, materials } from "@assets/data";
import { Input, Select } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Row = ({
  rowIndex,
  handleInputChange,
  handleSelectChange,
  handleAddSameRow,
  handleDeleteRow,
}) => {
  return (
    <tr>
      <td className="px-2 py-2">
        <Select
          className="w-full max-w-sm"
          size="large"
          defaultValue="material 1"
          onChange={(value) =>
            handleSelectChange({ target: { value } }, rowIndex, "material")
          }
        >
          {materials?.map((material) => (
            <Option key={material.value} value={material.value}>
              {material.label}
            </Option>
          ))}
        </Select>
      </td>
      <td className="px-2 py-2">
        <Input
          size="large"
          type="number"
          placeholder="12"
          className="w-full max-w-sm"
          onChange={(e) => handleInputChange(e, rowIndex, "quantity")}
        />
      </td>
      <td className="px-2 py-2">
        <Select
          className="w-full max-w-sm"
          size="large"
          defaultValue="red"
          onChange={(value) =>
            handleSelectChange({ target: { value } }, rowIndex, "color")
          }
        >
          {colors.map((color) => (
            <Option key={color.value} value={color.value}>
              {color.label}
            </Option>
          ))}
        </Select>
      </td>

      <td className="px-2 py-2">
        <Input
          type="text"
          size="large"
          placeholder="124k1"
          className="w-full max-w-sm"
          onChange={(e) => handleInputChange(e, rowIndex, "orderKey")}
        />
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

export default Row;
