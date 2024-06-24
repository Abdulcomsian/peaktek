import { InputContainer, Input } from "@components";
import { useState } from "react";

function CreateTask({ onAddTask }) {
  const [task, setTask] = useState("");
  const handleSubmit = function (e) {
    e.preventDefault();
    if (!task) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: task,
      isCompleted: false,
    };

    onAddTask(newTask);
    setTask("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            className="mt-4"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </InputContainer>
      </form>
    </div>
  );
}

export default CreateTask;
