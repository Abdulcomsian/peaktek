import { InputContainer, Input } from "@components";
import { useState } from "react";

function CreateTask() {
  const [task, setTask] = useState("");
  const handleSubmit = function (e) {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input />
        </InputContainer>
      </form>
    </div>
  );
}

export default CreateTask;
