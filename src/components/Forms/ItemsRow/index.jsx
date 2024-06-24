import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TfiAlignJustify } from "react-icons/tfi";
import { Input } from "@components";
import { Textarea } from "@components/FormControls";
const ItemsRow = ({
  item,
  index,
  handleInputChange,
  handleDelete,
  className,
}) => {
  return (
    <div className={`flex items-start justify-between py-4  ${className}`}>
      <TfiAlignJustify className="mr-2 md:mr-4" />
      <Input
        type="text"
        name="item"
        value={item.item}
        placeholder="Add item"
        onChange={(e) => handleInputChange(e, index)}
        className="w-full flex-1  lg:max-w-md mr-2 md:mr-4"
      />
      <Input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={(e) => handleInputChange(e, index)}
        className="flex-1 mr-2 md:mr-4"
      />
      <Input
        type="number"
        name="price"
        value={item.price}
        onChange={(e) => handleInputChange(e, index)}
        className="w-full flex-1 mr-2 md:mr-4"
      />
      <span className="w-full flex-1 mx-1 p-2 text-center">
        {item.quantity * item.price}
      </span>
      <FaTrashAlt
        className="text-red-500 cursor-pointer  mx-1"
        onClick={() => handleDelete(index)}
      />
    </div>
  );
};

export default ItemsRow;
