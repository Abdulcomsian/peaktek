import { useState } from "react";
import { CreateTask, EmptyTasks } from ".";

const initalTasks = [
  {
    title: "Pitty Pat",
    isCompleted: false,
  },
];

export default function Task() {
  const [tasks, setTasks] = useState(initalTasks);
  return (
    <div className="divide divide-y space-y-5">
      <EmptyTasks />
      <CreateTask />
    </div>
  );
}
