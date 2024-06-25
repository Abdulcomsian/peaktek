import { InputContainer, Input } from "@components";
import { DatePicker, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { HiMiniUser } from "react-icons/hi2";

import { useEffect, useRef, useState } from "react";

const items = [
  {
    label: "Omega",
    key: "0",
  },
  {
    label: "Math M.",
    key: "1",
  },
];

function CreateTask({ onAddTask }) {
  const inputRef = useRef(null);
  const [task, setTask] = useState("");
  const [showAssignee, setShowAssignee] = useState(false);

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
    setShowAssignee(false);
  };
  const handleInputFocus = function () {
    if (document.activeElement !== inputRef.current) setShowAssignee(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            className="my-4"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onFocus={handleInputFocus}
            ref={inputRef}
          />
        </InputContainer>
      </form>
      {showAssignee && (
        <div className="flex items-center gap-3">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Space>
              <div className="flex items-center gap-1 text-sm text-blue-500 font-semibold cursor-pointer">
                Assignee
                <HiMiniUser className="text-base" />
              </div>
            </Space>
          </Dropdown>
          <DatePicker
            placeholder="Due Date"
            variant="borderless"
            className="w-auto text-blue-500 font-semibold"
          />
        </div>
      )}
    </div>
  );
}

export default CreateTask;
