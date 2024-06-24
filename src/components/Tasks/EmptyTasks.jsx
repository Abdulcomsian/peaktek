import { LuSearch } from "react-icons/lu";

function EmptyTasks() {
  return (
    <div className="mt-3 border border-gray-300 rounded-md border-dashed py-3 text-xs font-medium flex items-center justify-center gap-1 text-gray-600">
      <span>
        <LuSearch />
      </span>
      No tasks yet
    </div>
  );
}

export default EmptyTasks;
