import React, { useState, useEffect, useRef } from "react";
import { HiOutlinePencil, HiOutlineX } from "react-icons/hi";
import { Checkbox } from "antd";

export default function TaskItem({
  task,
  onToggleCompleted,
  onDeleteTask,
  onEditTask,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDataToEdit = {
      title: newTitle,
      id: task.id,
    };
    onEditTask(newDataToEdit);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsEditing(false);
      handleSubmit(event);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTitle(task.title);
  };

  return (
    <li>
      <div
        className={`py-4 px-3 border border-gray-300 rounded-md flex items-center bg-slate-50 ${
          task.isCompleted ? "opacity-50" : ""
        }`}
      >
        <Checkbox
          onChange={() => onToggleCompleted(task.id)}
          checked={task.isCompleted}
        />
        {isEditing ? (
          <form onSubmit={handleSubmit} ref={inputRef}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              onBlur={handleSubmit}
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </form>
        ) : (
          <p
            className={`text-md text-gray-950 ml-2 ${
              task.isCompleted ? "line-through" : ""
            }`}
          >
            {task.title}
          </p>
        )}
        <div className="action-btns ml-auto flex items-center gap-4 text-lg">
          <HiOutlinePencil
            className={`cursor-pointer ${
              task.isCompleted
                ? "pointer-events-none opacity-45 cursor-not-allowed"
                : ""
            }`}
            onClick={handleEditClick}
          />
          <HiOutlineX
            className={`cursor-pointer ${
              task.isCompleted
                ? "pointer-events-none opacity-45 cursor-not-allowed"
                : ""
            }`}
            onClick={() => onDeleteTask(task.id)}
          />
        </div>
      </div>
    </li>
  );
}
