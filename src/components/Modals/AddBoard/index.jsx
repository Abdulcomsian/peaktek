import { useState } from "react";
import { Input } from "@components";
import { Modal } from "antd";

export default function AddBoardModal({ open, onCancel, onOk, onAddTitle }) {
  const [title, setTitle] = useState("");
  // const dispatch = useDispatch();
  const handleChange = function (e) {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTitle(title);
    // dispatch(addJob({ id: crypto.randomUUID(), content: job }));
    onOk();
  };
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk}>
      <h2 className="text-center text-xl">New Board</h2>
      <form onSubmit={handleSubmit}>
        <Input
          applyMarginBottom={true}
          label="Title"
          placeholder="Enter board title"
          value={title}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}
