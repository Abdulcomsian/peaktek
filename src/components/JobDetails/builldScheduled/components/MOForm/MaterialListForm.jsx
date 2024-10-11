import { Input, Select } from "@components/FormControls";
import { Button } from "@components/UI";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function MaterialListForm({ register, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

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
              id={`quality-${index}`}
              register={register}
            />

            <Select
              className="w-full"
              control={control}
              name={`materials[${index}].color`}
              id={`materials[${index}].color`}
              placeholder="Select Color"
              options={[
                { value: "red", label: "Red" },
                { value: "green", label: "green" },
                { value: "blue", label: "blue" },
              ]}
              defaultValue="green"
            />
            <Input
              name={`materials[${index}].order_key`}
              id={`orderKey-${index}`}
              register={register}
            />
            {index === 0 ? (
              <Button
                variant="accent"
                onClick={() =>
                  append({
                    material: "",
                    quality: "",
                    color: "",
                    orderKey: "",
                  })
                }
              >
                +
              </Button>
            ) : (
              <Button variant="accent" onClick={() => remove(index)}>
                -
              </Button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
