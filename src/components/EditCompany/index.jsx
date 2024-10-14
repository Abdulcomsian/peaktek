import React, { useState } from "react";
import { Button, Drawer, Space, Switch } from "antd";
import { Input, Select } from "@components/FormControls";
import { useForm } from "react-hook-form";

export default function EditCompanyDrawer() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Edit
        </Button>
      </Space>
      <Drawer title="Edit User" placement="right" onClose={onClose} open={open}>
        <form action="" className="flex flex-col gap-3 h-full">
          <Input
            label="First Name"
            register={register}
            name="first_name"
            id="first_name"
          />
          <Input
            label="Last Name"
            register={register}
            name="last_name"
            id="last_name"
          />
          <Input label="Email" register={register} name="email" id="email" />
          <Select
            size="large"
            control={control}
            label="Company"
            className="w-full"
            options={[{ label: "PeakTek", value: "peak_tek" }]}
          />
          <Select
            size="large"
            className="w-full"
            control={control}
            label="Permission Level"
            options={[
              { label: "Site Admin", value: "site_admin" },
              { label: "Job Admin", value: "job_admin" },
              { label: "Basic", value: "basic" },
            ]}
          />
          <div>
            <label htmlFor="" className="font-semibold mb-2 inline-block">
              Status
            </label>
            <div className="flex items-center gap-3">
              <Switch
              // onClick={onClick}
              // value={value}
              // defaultChecked={defaultChecked}
              />
              <span>Inactive</span>
            </div>
          </div>
          <Button type="primary" size="large" className="mt-auto">
            Update User
          </Button>
        </form>
      </Drawer>
    </>
  );
}
