import React from "react";
import { Button } from "@components/UI";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";

const { TextArea } = Input;

const TextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="textArea"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextArea
            {...field}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        )}
      />
      {errors.textArea && <span>This field is required</span>}
      <Button type="submit" variant="gradient" className="mt-4">
        Save
      </Button>
    </form>
  );
};

export default TextPage;
