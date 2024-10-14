import React, { useState } from "react";
import { Button, Drawer, Space, Switch } from "antd";
import { Input, Select } from "@components/FormControls";
import { useForm } from "react-hook-form";

export default function AddNewCompany() {
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
          + New Company
        </Button>
      </Space>
      <Drawer
        title="New Company"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form action="" className="flex flex-col gap-3 h-full">
          <Input
            label="Company Name"
            register={register}
            name="name"
            id="name"
          />
          <Input
            label="Website"
            type="url"
            register={register}
            name="website"
            id="website"
          />
          <Input
            label="Site Admin Name (Main User)"
            register={register}
            name="site_admin-name"
            id="site_admin-name"
          />
          <Input
            label="Site Admin Email"
            register={register}
            type="email"
            name="site_admin-email"
            id="site_admin-email"
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
            Save
          </Button>
        </form>
      </Drawer>
    </>
  );
}
