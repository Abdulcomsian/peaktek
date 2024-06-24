import React, { useState } from "react";
import { ItemsRow } from "@components/Forms";
import { Button } from "@components";

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
        <div className="flex justify-between  items-center text-center  py-2 ">
          <span className="w-full ">Item</span>
          <span className="w-full ">Quantity</span>
          <span className="w-full ">Price</span>
          <span className="w-full ">Line Total</span>
        </div>
        {items?.map((item, index) => (
          <ItemsRow
            key={index}
            item={item}
            index={index}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Button
          onClick={handleAddRow}
          className="p-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300"
        >
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
