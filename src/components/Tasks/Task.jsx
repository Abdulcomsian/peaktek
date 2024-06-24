import { CreateTask, EmptyTasks } from ".";

export default function Task() {
  return (
    <div className="divide divide-y space-y-5">
      <EmptyTasks />
      <CreateTask />
    </div>
  );
}
