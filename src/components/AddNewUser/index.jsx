import React, { useState } from "react";
import { Drawer, Space } from "antd";
import { Input, Select } from "@components/FormControls";
import { useForm } from "react-hook-form";
import { Button, Loader } from "@components/UI";
import { useAuth } from "@context/AuthContext";
import { formateErrorName } from "../../utils/helper";
import SwitchControlled from "@components/FormControls/SwitchControlled";
import { createUser } from "@services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddNewUser({ onRevalidatePage }) {
  const { logout, user: userData } = useAuth();
  const navigate = useNavigate();
  const companyId = userData.company_id;
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();

  const isActiveStatus = watch("status");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async function (data) {
    const dataToLoad = {
      ...data,
      company_id: companyId,
      status: data.status ? "inactive" : "active",
    };
    const resp = await createUser(dataToLoad);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      onClose();
      onRevalidatePage();
      reset();
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
          + New User
        </Button>
      </Space>
      <Drawer title="New User" placement="right" onClose={onClose} open={open}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex flex-col gap-3 h-full"
        >
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
          <Input
            label="Email"
            register={register}
            type="email"
            name="email"
            id="email"
          />
          <Select
            size="large"
            className="w-full"
            control={control}
            name="permission_level_id"
            id="permission_level_id"
            label="Permission Level"
            options={[
              { label: "Site Admin", value: 2 },
              { label: "Job Admin", value: 9 },
              { label: "Basic", value: 8 },
            ]}
            error={
              errors?.permission_level_id?.message &&
              formateErrorName(errors?.permission_level_id?.message)
            }
          />
          <div>
            <label htmlFor="" className="font-semibold mb-2 inline-block">
              Status
            </label>
            <div className="flex items-center gap-3">
              <SwitchControlled control={control} name="status" />
              <span>{isActiveStatus ? "Active" : "Inactive"}</span>
            </div>
          </div>
          <Button variant="gradient" type="submit" className="mt-auto">
            {isSubmitting ? (
              <Loader width="20px" height="20px" color="#ffffff" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Drawer>
    </>
  );
}
