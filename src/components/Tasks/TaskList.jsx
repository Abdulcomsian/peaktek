import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleCompleted, onDeleteTask, onEditTask }) {
  return (
    <ul className="flex flex-col gap-2 mt-4">
      {tasks.map((task) => (
        <TaskItem
          task={task}
          onToggleCompleted={onToggleCompleted}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
