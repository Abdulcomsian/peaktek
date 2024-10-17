import { Switch } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export default function SwitchControlled({ name, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Switch onChange={onChange} checked={value} />
      )}
    />
  );
}
