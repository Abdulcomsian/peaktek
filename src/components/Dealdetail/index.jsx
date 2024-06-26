import Header from "./Header";
import JobActivities from "./JobActivities";
import JobContent from "./JobContent";

export default function Dealdetail() {
  return (
    <div className="grid grid-cols-[30%_70%] grid-rows-[auto_1fr] h-full">
      <Header />
      <JobActivities />
      <JobContent />
    </div>
  );
}
