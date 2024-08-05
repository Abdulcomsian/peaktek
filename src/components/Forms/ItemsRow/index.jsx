import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Input } from "@components";
import { Button } from "@components/UI";

const itemFields = [
  { title: "Item", type: "text", placeholder: "Item Name" },
  { title: "Qunatity", type: "number", placeholder: "2" },
  { title: "Price", type: "number", placeholder: "5" },
  { title: "Line Total", type: "number", placeholder: "10" },
];

const ItemsRow = ({ index, handleDelete, className, register }) => {
  return (
    <div className={`flex items-center py-4  ${className}`}>
      {/* <TfiAlignJustify className="mr-2 md:mr-4" /> */}
      {itemFields.map((field) => (
        <Input
          label={index === 0 ? field.title : null}
          applyMarginBottom={index === 0}
          type={field.type}
          placeholder={field.placeholder}
          className="flex-1 lg:max-w-md mr-2 md:mr-4"
          name={`${field.title}_${index}`}
          register={register}
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
