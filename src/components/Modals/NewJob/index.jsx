import { useState } from "react";
import { Input } from "@components";
import { Modal, Spin } from "antd";
import { useForm } from "react-hook-form";
import { createJob } from "@services/apiJobs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addJob } from "@store/slices/JobsSlice";
import { Button } from "@components/UI";

const modalInputsData = [
  { name: "address", label: "Job Address", placeholder: "Enter new job" },
  { name: "name", label: "Name", placeholder: "Enter customer name" },
  { name: "email", label: "Email", placeholder: "Email address" },
  { name: "phone", label: "Phone", placeholder: "Phone number" },
];

function NewJobModal({ open, onCancel, onOk, onAddJob }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [job, setJob] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = function (e) {
    setJob(e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      setIsCreating(true);
      const resp = await createJob(data);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
        dispatch(addJob(resp.job));
        onAddJob();
        onOk();
      }
      if (Object.keys(resp?.errors).length > 0) {
        toast.error(resp.message);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <h1 className="text-center text-xl font-semibold my-4">New Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modalInputsData.map((data) => (
          <Input
            applyMarginBottom={true}
            name={data.name}
            label={data.label}
            placeholder={data.placeholder}
            className="mb-3"
            register={register}
            error={errors?.[data.name]?.message}
          />
        ))}
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
