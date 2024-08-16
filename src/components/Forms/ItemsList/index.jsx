import React, { useState } from "react";
import { ItemsRow } from "@components/Forms";
import { Button } from "@components";
import { Input } from "@components/FormControls";

const ItemsList = ({ className, sectionIndex, register }) => {
  const [items, setItems] = useState([{ item: "", quantity: 0, price: 0 }]);
  const totalAmount = 6.5;

  const handleAddRow = () => {
    setItems([...items, { item: "", quantity: 0, price: 0 }]);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className={className}>
      <div className="w-full mx-auto mb-8">
        {items?.map((item, index) => (
          <ItemsRow
            key={index}
            // item={item}
            index={index}
            handleDelete={handleDelete}
            sectionIndex={sectionIndex}
            register={register}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={handleAddRow} variant="gradient">
          Add Item
        </Button>
        <div>
          <span className="w-full mr-4 text-gray-600 font-semibold">
            Section total:
          </span>
          <Input
            disabled={true}
            type="number"
            className="inline-block"
            register={register}
            id={`sections[${sectionIndex}].section_total`}
            name={`sections[${sectionIndex}].section_total`}
            required={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
