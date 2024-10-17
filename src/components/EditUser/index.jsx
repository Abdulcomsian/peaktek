import React, { useEffect, useState } from "react";
import { Drawer, Select, Space, Switch } from "antd";
import { Input } from "@components/FormControls";
import { Button, Loader } from "@components/UI";
import { updateUser } from "@services/apiUser";
import toast from "react-hot-toast";

export default function EditUserDrawer({ item, onRevalidatePage }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [permissionLevel, setpermissionLevel] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFirstName(item.first_name);
    setlastName(item.last_name);
    setemail(item.email);
    setpermissionLevel(item.role_id);
    setStatus(item.status);
  }, []);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const newData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      permission_level: permissionLevel,
      status: status,
    };

    try {
      setIsUpdating(true);
      const resp = await updateUser(newData, item.id);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        onClose();
        onRevalidatePage();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Space>
        <Button variant="gradient" onClick={showDrawer}>
          Edit
        </Button>
      </Space>
      <Drawer
        key={item.id}
        title="Edit User"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 h-full"
        >
          <Input
            label="First Name"
            name="first_name"
            id="first_name"
            defaultValue={item.first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            name="last_name"
            id="last_name"
            defaultValue={item.last_name}
            onChange={(e) => setlastName(e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            defaultValue={item.email}
            onChange={(e) => setemail(e.target.value)}
          />
          <div>
            <label htmlFor="" className="font-medium text-sm">
              Permission level
            </label>
            <Select
              size="large"
              fieldNames="permission_level"
              options={[
                { label: "Job Admin", value: 9 },
                { label: "Basic", value: 8 },
              ]}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              onChange={(value) => setpermissionLevel(value)} // Handle change
              defaultValue={Number(item.role_id)} // Set default value
            />
          </div>
          <div>
            <label htmlFor="" className="font-semibold mb-2 inline-block">
              Status
            </label>
            <div className="flex items-center gap-3">
              <Switch
                onChange={(value) => setStatus(value ? "inactive" : "active")}
                defaultChecked={item.status === "inactive"}
              />
              <span>Inactive</span>
            </div>
          </div>
          <Button
            variant="gradient"
            type="submit"
            size="large"
            className="mt-auto"
          >
            {isUpdating ? (
              <Loader width="24px" height="24px" color="#fff" />
            ) : (
              "Update User"
            )}
          </Button>
        </form>
      </Drawer>
    </>
  );
}
