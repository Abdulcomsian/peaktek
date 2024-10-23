import React, { useState } from "react";
import { Drawer, Space, Switch } from "antd";
import { Input, Select } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { Button } from "@components/UI";
import SwitchControlled from "@components/FormControls/SwitchControlled";
import { createCompany } from "@services/apiCompany";
import toast from "react-hot-toast";
import { useAuth } from "@context/AuthContext";

export default function AddNewCompany({ onRevalidatePage }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({ defaultValues: { status: false } });
  const { user } = useAuth();
  const isSuperAdmin = user?.role?.name === "Super Admin";
  const [open, setOpen] = useState(false);
  const status = watch("status");
  console.log(status);
  let permissionLevelOptions = [{ label: "Site Admin", value: 2 }];
  if (!isSuperAdmin)
    permissionLevelOptions = [
      ...permissionLevelOptions,
      { label: "Job Admin", value: 9 },
      { label: "Basic", value: 8 },
    ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async function (data) {
    console.log(data);
    const dataToLoad = {
      ...data,
      status: data.status ? "active" : "inactive",
    };

    const resp = await createCompany(dataToLoad);
    console.log("Create company resp", resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      reset();
      onClose();
      onRevalidatePage();
    }
    if (resp.status === 401) {
      logout();
      navigate("/");
    }
  };
  return (
    <>
      <Space>
        <Button variant="gradient" onClick={showDrawer}>
          + New Company
        </Button>
      </Space>
      <Drawer
        title="New Company"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 h-full"
        >
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
            name="site_admin_name"
            id="site_admin_name"
          />
          <Input
            label="Site Admin Email"
            register={register}
            type="email"
            name="site_admin_email"
            id="site_admin_email"
          />
          <Select
            size="large"
            className="w-full"
            control={control}
            label="Permission Level"
            name="permission_level"
            options={permissionLevelOptions}
          />
          <div>
            <label htmlFor="" className="font-semibold mb-2 inline-block">
              Status
            </label>
            <div className="flex items-center gap-3">
              <SwitchControlled control={control} name="status" />
              <span>{status ? "Active" : "Inactive"}</span>
            </div>
          </div>
          <Button
            variant="gradient"
            type="submit"
            size="large"
            className="mt-auto"
          >
            Save
          </Button>
        </form>
      </Drawer>
    </>
  );
}
