import React, { useEffect, useState } from "react";
import { Drawer, Space, Switch } from "antd";
import { Input, Select } from "@components/FormControls";
import { Button, Loader } from "@components/UI";
import { updateCompany } from "@services/apiCompany";
import toast from "react-hot-toast";

export default function EditCompanyDrawer({ dataToEdit, onCompanyRevalidate }) {
  const [company, setCompany] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [siteAdminName, setSiteAdminName] = useState("");
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setName(dataToEdit.company.name);
    setWebsite(dataToEdit.company.website);
    setSiteAdminName(dataToEdit.company.site_admin?.name);
    setStatus(dataToEdit.company.status);
  }, [dataToEdit.id]);

  const handleSubmit = async function (e) {
    e.preventDefault();

    const newData = {
      name,
      website,
      site_admin_name: siteAdminName,
      status: status,
    };
    console.log("NEW DATA", newData);

    try {
      setIsEditing(true);
      const resp = await updateCompany(newData, dataToEdit.company.id);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        onClose();
        onCompanyRevalidate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
    console.log("updatind company resp", resp);
  };

  return (
    <>
      <Space>
        <Button variant="gradient" onClick={showDrawer}>
          Edit
        </Button>
      </Space>
      <Drawer
        key={dataToEdit.company.id}
        title="Edit Company"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form
          action=""
          className="flex flex-col gap-3 h-full"
          onSubmit={handleSubmit}
        >
          <Input
            label="Company name"
            name="name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Website"
            name="website"
            defaultValue={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {/* <Input
            label="Site admin name"
            name="site_admin_name"
            defaultValue={siteAdminName}
            onChange={(e) => setSiteAdminName(e.target.value)}
          /> */}
          <div>
            <label htmlFor="" className="font-semibold mb-2 inline-block">
              Status
            </label>
            <div className="flex items-center gap-3">
              <Switch
                onChange={(value) => setStatus(value ? "active" : "inactive")}
                defaultChecked={status === "active"}
              />
              <span>{status === "active" ? "Active" : "Inactive"}</span>
            </div>
          </div>
          <Button variant="gradient" type="submit" className="mt-auto">
            {isEditing ? (
              <Loader width="24px" height="24px" color="#fff" />
            ) : (
              "Update Company"
            )}
          </Button>
        </form>
      </Drawer>
    </>
  );
}
