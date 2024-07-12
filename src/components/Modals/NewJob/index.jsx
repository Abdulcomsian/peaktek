import { useState } from "react";
import { Input } from "@components";
import { Modal, Spin } from "antd";
import { useForm } from "react-hook-form";
import { createJob } from "@services/apiJobs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addJob } from "@store/slices/JobsSlice";

function NewJobModal({ open, onCancel, onOk, onAddJob }) {
  const { handleSubmit, register, reset } = useForm();
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
        <Input
          applyMarginBottom={true}
          name="address"
          label="Job Address"
          placeholder="Enter new job"
          className="mb-4"
          register={register}
        />
        <Input
          applyMarginBottom={true}
          label="Name"
          name="name"
          placeholder="Enter customer name"
          className="mb-4"
          register={register}
        />
        <Input
          applyMarginBottom={true}
          label="Email"
          name="email"
          placeholder="Email address"
          className="mb-4"
          register={register}
        />
        <Input
          applyMarginBottom={true}
          name="phone"
          label="Phone"
          placeholder="Phone number"
          className="mb-4"
          register={register}
        />
        <div className="flex justify-center">
          <button
            type="Submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white min-w-[100px]"
          >
            {isCreating ? <Spin /> : "Add Job"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewJobModal;
