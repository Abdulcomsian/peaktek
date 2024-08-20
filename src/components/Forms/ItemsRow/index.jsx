import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Input } from "@components";
import { Button } from "@components/UI";

const itemFields = [
  { title: "item", type: "text", placeholder: "Item Name" },
  { title: "quantity", type: "number", placeholder: "2" },
  { title: "price", type: "number", placeholder: "5" },
  { title: "line_total", type: "number", placeholder: "10" },
];

const ItemsRow = ({
  index,
  handleDelete,
  sectionIndex,
  className,
  register,
  watch,
  setValue,
}) => {
  const quantity = watch(
    `sections[${sectionIndex}].items[${index}].quantity`,
    0
  );
  const price = watch(`sections[${sectionIndex}].items[${index}].price`, 0);

  const lineTotal = (quantity * price).toFixed(2);

  useEffect(() => {
    setValue(`sections[${sectionIndex}].items[${index}].line_total`, lineTotal);
  }, [quantity, price, lineTotal, sectionIndex, index, setValue]);

  return (
    <div className={`flex items-center py-4 ${className}`}>
      {itemFields.map((field, i) => (
        <Input
          key={i}
          label={index === 0 ? field.title : null}
          applyMarginBottom={index === 0}
          type={field.type}
          placeholder={field.placeholder}
          className="flex-1 lg:max-w-md mr-2 md:mr-4"
          name={`sections[${sectionIndex}].items[${index}].${field.title}`}
          register={register}
          defaultValue={field.title === "line_total" ? lineTotal : ""}
          disabled={field.title === "line_total"}
        />
      ))}
      <Button variant="deleteBtn" className="self-end">
        <FaTrashAlt
          className="text-red-500 cursor-pointer mx-1"
          onClick={() => handleDelete(index)}
        />
      </Button>
    </div>
  );
};

export default ItemsRow;
