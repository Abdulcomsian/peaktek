import React, { useEffect, useMemo, useState } from "react";
import { ItemsRow } from "@components/Forms";
import { Button } from "@components";
import { Input } from "@components/FormControls";
import { v4 as uuidv4 } from "uuid";

const ItemsList = ({
  className,
  section,
  sectionIndex,
  register,
  watch,
  setValue,
  defaultItem,
  onDeleteRemoteItem,
  onDeleteItem,
}) => {
  const [items, setItems] = useState([
    { id: uuidv4(), item: "", quantity: 0, price: 0 },
  ]);

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
  }, [defaultItem]);

  useEffect(() => {
    setValue(`sections[${sectionIndex}].section_total`, sectionTotal);
  }, [sectionTotal, sectionIndex, setValue]);

  const handleAddRow = () => {
    setItems((items) => [
      ...items,
      { id: uuidv4(), item: "", quantity: 0, price: 0 },
    ]);
  };

  const handleDeletItem = function (section_id, item_id) {
    console.log(section_id, item_id);
    console.log(
      "here",
      items.filter((item) => item.id !== item_id)
    );
    if (typeof item_id === "number") onDeleteRemoteItem?.(section_id, item_id);
    if (typeof item_id !== "number") {
      setItems((items) =>
        items.filter((item) => {
          console.log(item.id, item_id);
          return item.id !== item_id;
        })
      );
    }
  };

  useEffect(function () {
    console.log("ITEMS", items);
  });

  return (
    <div className={className}>
      <div className="w-full mx-auto mb-8">
        {items.map((item, index) => (
          <ItemsRow
            key={item.id}
            index={index}
            // handleDelete={handleDelete}
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
