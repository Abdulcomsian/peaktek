import { Input } from "@components/FormControls";
import { Button } from "@components/UI";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function MaterialListForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      materials: [{ material: "", quality: "", color: "", orderKey: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <table className="w-full">
        <thead>
          <tr>
            <th>Material</th>
            <th>Quality</th>
            <th>Color</th>
            <th>Order key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td>
                <Input
                  name={`materials[${index}].material`}
                  id={`material-${index}`}
                  register={register}
                />
              </td>
              <td>
                <Input
                  name={`materials[${index}].quality`}
                  id={`quality-${index}`}
                  register={register}
                />
              </td>
              <td>
                <Input
                  name={`materials[${index}].color`}
                  id={`color-${index}`}
                  register={register}
                />
              </td>
              <td>
                <Input
                  name={`materials[${index}].orderKey`}
                  id={`orderKey-${index}`}
                  register={register}
                />
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="submit">Submit</Button>
    </form>
  );
}
