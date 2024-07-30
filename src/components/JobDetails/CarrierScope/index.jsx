import { UploaderInputs } from "@components/index";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CarrierScope() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data) {
    console.log(data);
  };

  const handleDelete = function () {};

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <UploaderInputs
        register={register}
        id="carrier_scope_file"
        name="carrier_scope_file"
        fileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
        handleDelete={handleDelete}
      />
    </form>
  );
}
