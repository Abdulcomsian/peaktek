// components/ItemList.js
import React, { useState } from "react";
import { AuthRows } from "@components/Forms";
import { Button } from "@components";

const AuthList = () => {
  const [items, setItems] = useState([{ item: "", quantity: 0, price: 0 }]);

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
    <div>
      <div className="w-full mx-auto mb-8">
        <div className="flex justify-between items-start text-start  py-2 border-b-2 border-gray-300">
          <span className="w-full flex-1">Item</span>
          <span className="w-full flex-1 ">Quantity</span>
          <span className="w-full flex-1 ">Price</span>
          <span className="w-full flex-1 ">Line Total</span>
        </div>
        {items?.map((item, index) => (
          <AuthRows
            key={index}
            item={item}
            index={index}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <Button
        onClick={handleAddRow}
        className="p-2 bg-white border border-gray-400 rounded-md font-medium hover:bg-slate-300"
      >
        Add Item
      </Button>
    </div>
  );
};

export default AuthList;
