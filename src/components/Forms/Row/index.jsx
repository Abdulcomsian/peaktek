import React from "react";
import { colors, materials } from "@assets/data";
import { Select } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { Input, InputContainer } from "@components";

const Row = ({
  rowIndex,
  handleAddSameRow,
  handleDeleteRow,
  register,
  control,
  defaultValue,
}) => {
  console.log(rowIndex, defaultValue);
  return (
    <tr>
      <td className="px-2 py-2">
        <Input
          size="large"
          type="text"
          placeholder="12"
          className="w-full max-w-sm"
          name={`material-${rowIndex}`}
          id={`material-${rowIndex}`}
          register={register}
          required={false}
          defaultValue={defaultValue?.material || ""}
        />
      </td>
      <td className="px-2 py-2">
        <Input
          size="large"
          type="number"
          placeholder="12"
          className="w-full max-w-sm"
          name={`quantity-${rowIndex}`}
          id={`quantity-${rowIndex}`}
          register={register}
          required={false}
          defaultValue={defaultValue?.quantity || ""}
        />
      </td>
      <td className="px-2 py-2">
        <Controller
          name={`color-${rowIndex}`}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="w-full max-w-sm"
              size="large"
              defaultValue={defaultValue?.color || "Red"}
              register={register}
            >
              {colors.map((color) => (
                <Select.Option key={color.value} value={color.value}>
                  {color.label}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </td>

      <td className="px-2 py-2">
        <Input
          type="number"
          size="large"
          placeholder="124k1"
          className="w-full max-w-sm"
          name={`order_key-${rowIndex}`}
          id={`order_key-${rowIndex}`}
          register={register}
          required={false}
          defaultValue={defaultValue?.order_key || ""}
        />
      </td>
      <td className="text-center py-2">
        {rowIndex === 0 ? (
          <button
            className="p-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleAddSameRow}
            type="button"
          >
            <FaPlus />
          </button>
        ) : (
          <button
            className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleDeleteRow(rowIndex)}
            type="button"
          >
            <FaMinus />
          </button>
        )}
      </td>
    </tr>
  );
};

export default Row;
