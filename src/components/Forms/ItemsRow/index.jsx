import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Input } from "@components";
import { Button } from "@components/UI";

const ItemsRow = ({ fields, index, handleDelete, className }) => {
  return (
    <div className={`flex items-center py-4  ${className}`}>
      {/* <TfiAlignJustify className="mr-2 md:mr-4" /> */}
      {fields.map((field) => (
        <Input
          label={index === 0 ? field.title : null}
          applyMarginBottom={index === 0}
          type={field.type}
          name="item"
          placeholder={field.placeholder}
          className="flex-1 lg:max-w-md mr-2 md:mr-4"
        />
      ))}
      <Button variant="deleteBtn" className="self-end">
        <FaTrashAlt
          className="text-red-500 cursor-pointer  mx-1"
          onClick={() => handleDelete(index)}
        />
      </Button>
    </div>
  );
};

export default ItemsRow;
