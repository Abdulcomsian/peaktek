import { useState } from "react";
import { CreateTask, EmptyTasks } from ".";
import TaskList from "./TaskList";

const initalTasks = [
  {
    id: 1,
    title: "Pitty Pat",
    isCompleted: false,
  },
];

export default function Task() {
  const [tasks, setTasks] = useState(initalTasks);
  const hasTask = tasks.length;

  const handleAddTask = function (newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  };

  const handleCompletedTask = function (id) {
    setTasks((task) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = function (id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = function (dataToEdit) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === dataToEdit.id
          ? { ...task, title: dataToEdit["title"] }
          : task
      )
    );
  };

  return (
    <div className="divide divide-y space-y-5">
      {hasTask ? (
        <TaskList
          tasks={tasks}
          onToggleCompleted={handleCompletedTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      ) : (
        <EmptyTasks />
      )}
      <CreateTask onAddTask={handleAddTask} />
    </div>
  );
}
