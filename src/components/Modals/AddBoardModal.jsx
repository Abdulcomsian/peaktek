import { useState } from "react";
import Input from "../Input";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addJob } from "../../store/slices/JobsSlice";

function AddBoradModal({ onClick, open, onCancel, onOk }) {
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  const handleChange = function (e) {
    setJob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addJob({ id: crypto.randomUUID(), content: job }));
    onOk();
  };
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk}>
      <h2 className="text-center text-xl">New Jobssss</h2>
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
