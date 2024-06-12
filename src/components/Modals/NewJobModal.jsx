import { useState } from "react";
import Input from "@components/Input";
import { Modal } from "antd";

function NewJobModal({ open, onCancel, onOk, onAddJob }) {
  const [job, setJob] = useState("");

  const handleChange = function (e) {
    setJob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddJob({ id: crypto.randomUUID(), content: job });
    // dispatch(addJob({ id: crypto.randomUUID(), content: job }));
    onOk();
  };

  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <h1 className="text-center text-xl font-semibold my-4">New Job</h1>
      <form onSubmit={handleSubmit}>
        <Input
          applyMarginBottom={true}
          label="Job Address"
          placeholder="Enter new job"
          value={job}
          className="mb-4"
          onChange={handleChange}
        />
        <div className="flex justify-center">
          <button
            type="Submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          >
            Add Job
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewJobModal;
