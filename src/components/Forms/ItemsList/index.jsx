import React, { useEffect, useMemo, useState } from "react";
import { ItemsRow } from "@components/Forms";
import { Button } from "@components";
import { Input } from "@components/FormControls";

const ItemsList = ({
  className,
  section,
  sectionIndex,
  register,
  watch,
  setValue,
  defaultItem,
  onDeleteItem,
}) => {
  console.log("DEFAULT ITEM", defaultItem);
  const [items, setItems] = useState([{ item: "", quantity: 0, price: 0 }]);

  // Watch for changes in line_total values
  const lineTotals = items.map((_, index) =>
    watch(`sections[${sectionIndex}].items[${index}].line_total`, 0)
  );

  const sectionTotal = useMemo(() => {
    return lineTotals
      .reduce((acc, total) => acc + parseFloat(total || 0), 0)
      .toFixed(2);
  }, [lineTotals]);

  useEffect(() => {
    if (defaultItem?.length > 0) setItems(defaultItem);
    console.log("ITEM TO ITERATE", items);
  }, [defaultItem]);

  useEffect(() => {
    setValue(`sections[${sectionIndex}].section_total`, sectionTotal);
  }, [sectionTotal, sectionIndex, setValue]);

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
        {items.map((item, index) => (
          <ItemsRow
            key={index}
            index={index}
            handleDelete={handleDelete}
            sectionIndex={sectionIndex}
            register={register}
            watch={watch}
            setValue={setValue}
            item={item}
            section={section}
            onDeleteItem={onDeleteItem}
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
