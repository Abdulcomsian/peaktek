import React, { useState } from "react";
import { ItemsRow } from "@components/Forms";
import { Button } from "@components";
import { Input } from "@components/FormControls";

const itemFields = [
  { title: "Item", type: "text", placeholder: "Item Name" },
  { title: "Qunatity", type: "number", placeholder: "2" },
  { title: "Price", type: "number", placeholder: "5" },
  { title: "Line Total", type: "number", placeholder: "10" },
];

const ItemsList = ({ className }) => {
  const [items, setItems] = useState([{ item: "", quantity: 0, price: 0 }]);
  const totalAmount = 6.5;
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

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
            fields={itemFields}
            key={index}
            item={item}
            index={index}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
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
          <span className="w-full">{`$${totalAmount}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
