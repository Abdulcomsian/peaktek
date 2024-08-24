import React from "react";
import { Button } from "@components/UI";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

const TextPage = ({ control, name, errors }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextArea
            {...field}
            placeholder="Write any content here..."
            autoSize={{ minRows: 6, maxRows: 7 }}
          />
        )}
      />
      {errors?.[name] && <span>{errors[name]?.message}</span>}
      <Button type="submit" variant="gradient" className="mt-4">
        Save
      </Button>
    </>
  );
};

export default TextPage;
