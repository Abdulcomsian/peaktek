import { BiTask } from "react-icons/bi";

export default function JobSummary() {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div className="days text-xs px-2">6 days</div>
      <div className="bg-gray-200 text-xs rounded-md flex items-center gap-2 p-1 px-2 text-gray-600">
        <BiTask />
        <p>Task 0/1</p>
      </div>
      <div className="flex items-center gap-2 p-1 text-xs px-2 border border-1 border-gray-200 rounded-md text-gray-500">
        <BiTask />
        <p>No Proposals</p>
      </div>
      <div className="flex items-center gap-2 p-1 text-xs px-2  text-gray-500">
        <p>Updated 4 days ago</p>
      </div>
      <div className="flex items-center gap-2 p-1 text-xs px-2 text-gray-500">
        <p>All changes saved</p>
      </div>
    </div>
  );
}
