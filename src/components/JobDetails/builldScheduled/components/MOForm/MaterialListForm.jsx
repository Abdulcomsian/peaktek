import { Input, Select } from "@components/FormControls";
import { Button } from "@components/UI";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function MaterialListForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });
  console.log("fieldsss", fields);

  useEffect(() => {
    if (fields.length === 0) {
      append({ material: "", quantity: "", color: "", orderKey: "" });
    }
  }, [fields, append]);

  const handleItemDelete = function (item) {
    console.log(item);
  };

  return (
    <div className="w-full mt-4">
      <header className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] gap-3 text-center font-semibold">
        <div>Material</div>
        <div>Quantity</div>
        <div>Color</div>
        <div>Order key</div>
        <div>Action</div>
      </header>
      <main>
        {fields.map((item, index) => (
          <>
            <div
              key={item.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_100px] gap-3 mb-3"
            >
              <Input
                name={`materials[${index}].material`}
                id={`material-${index}`}
                register={register}
              />

              <Input
                type="number"
                name={`materials[${index}].quantity`}
                id={`quantity-${index}`}
                register={register}
              />

              <Select
                className="w-full"
                size="large"
                control={control}
                name={`materials[${index}].color`}
                id={`materials[${index}].color`}
                placeholder="Select Color"
                options={[
                  { value: "red", label: "Red" },
                  { value: "green", label: "Green" },
                  { value: "blue", label: "Blue" },
                ]}
                defaultValue="green"
              />
              <Input
                name={`materials[${index}].orderKey`}
                id={`orderKey-${index}`}
                register={register}
              />

              <Button variant="accent" onClick={() => handleItemDelete(item)}>
                -
              </Button>
            </div>
          </>
        ))}
        <Button
          variant="gradient"
          className="float-right"
          onClick={() =>
            append({
              material: "",
              quantity: "",
              color: "",
              orderKey: "",
            })
          }
        >
          + Add Material
        </Button>
      </main>
    </div>
  );
}
