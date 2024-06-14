// components/ItemRow.js
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Input } from "@components";
const AuthRows = ({
  item,
  index,
  handleInputChange,
  handleDelete,
  className,
}) => {
  return (
    <div
      className={`flex items-center justify-between py-2 border-b border-gray-300 ${className}`}
    >
      <Input
        type="text"
        name="item"
        value={item.item}
        placeholder="Add item"
        onChange={(e) => handleInputChange(e, index)}
        className="w-full flex-1 grow  mr-4 max-w-lg"
      />
      <Input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={(e) => handleInputChange(e, index)}
        className="flex-1 mr-4"
      />
      <Input
        type="number"
        name="price"
        value={item.price}
        onChange={(e) => handleInputChange(e, index)}
        className="flex-1 mr-4"
      />
      <span className="flex-1 mx-1 p-2 text-center">
        {item.quantity * item.price}
      </span>
      <FaTrashAlt
        className="text-red-500 cursor-pointer w-20 mx-1"
        onClick={() => handleDelete(index)}
      />
    </div>
  );
};

export default AuthRows;
