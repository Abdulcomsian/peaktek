import JobCard from "@components/JobCard";
import { Card } from "..";

const labelToShow = [
  { label: "New Leads" },
  { label: "Projects in Progress" },
  { label: "Final Payment Due" },
];

export default function CurrentJobs({ customers, deals_won_closed }) {
  return (
    <Card className="">
      <h2 className="text-lg font-semibold tracking-wide mb-4">Current Jobs</h2>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {labelToShow.map((item, index) => (
          <JobCard
            label={item.label}
            number={customers}
            className={`${index === 0 && "!bg-[#20b6d5]"} ${
              index === 1 && "!bg-[#22a3cc]"
            } ${index === 2 && "!bg-[#2590c2]"} w-full text-blue-100 `}
            labeClassName="!font-medium"
          />
        ))}
      </div>
    </Card>
  );
}
