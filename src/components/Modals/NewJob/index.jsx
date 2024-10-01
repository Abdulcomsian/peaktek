import { useEffect, useState } from "react";
import { Input } from "@components";
import { Modal, Spin } from "antd";
import { useForm } from "react-hook-form";
import { createJob } from "@services/apiJobs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addJob } from "@store/slices/JobsSlice";
import { Button } from "@components/UI";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../../../utils/helper";

const modalInputsData = [
  {
    id: "1",
    name: "address",
    label: "Job Address",
    placeholder: "Enter new job",
  },
  { id: "2", name: "name", label: "Name", placeholder: "Enter customer name" },
  { id: "3", name: "email", label: "Email", placeholder: "Email address" },
];

function NewJobModal({ open, onCancel, onOk, onAddJob }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const [isCreating, setIsCreating] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsCreating(true);
      const resp = await createJob(data);

      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.data.message);
        onAddJob();
        onOk();
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
      if (resp.response.status === 422) toast.error(resp.response.data.message);
    } catch (error) {
    } finally {
      setIsCreating(false);
    }
  };

  const phone = watch("phone");

  useEffect(() => {
    setValue("phone", formatPhoneNumber(phone));
  }, [phone]);

  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <h1 className="text-center text-xl font-semibold my-4">New Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modalInputsData?.map((data) => (
          <Input
            key={data?.id}
            applyMarginBottom={true}
            name={data.name}
            label={data.label}
            placeholder={data.placeholder}
            className="mb-3"
            register={register}
            error={errors?.[data.name]?.message}
          />
        ))}
        <Input
          key={4}
          applyMarginBottom={true}
          name="phone"
          label="Phone"
          placeholder="000-000-0000"
          className="mb-3"
          register={register}
          error={errors?.phone?.message}
          maxLength={12}
        />
        <div className="flex justify-center">
          <Button
            variant="gradient"
            type="Submit"
            className="px-4 py-2  text-white uppercase font-semibold min-w-[100px]"
          >
            {isCreating ? <Spin /> : "Add Job"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewJobModal;
