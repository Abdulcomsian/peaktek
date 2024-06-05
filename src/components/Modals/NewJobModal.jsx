import { useState } from "react";
import Input from "../Input";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addJob } from "../../store/slices/JobsSlice";

function NewJobModal({ onClick, open, onCancel }) {
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  const handleChange = function (e) {
    setJob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJob({ id: crypto.randomUUID(), content: job }));
  };
  return (
    <Modal open={open} onCancel={onCancel}>
      <h2 className="text-center text-xl">New Job</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Job Address"
          placeholder="Enter address and select"
          value={job}
          onChange={handleChange}
        />
        <button type="Submit">add</button>
      </form>
    </Modal>
  );
}

export default NewJobModal;
