import JobCard from "@components/JobCard";
import React from "react";
import { Card } from "..";
import { formatCurrency } from "../../utils/helper";

const weeklyDataToMap = [
  {
    to: "/user-jobs?type=weekly&status=new_leads",
    label: "New Leads",
    status: "new_leads",
  },
  {
    to: "/user-jobs?type=weekly&status=won_closed",
    label: "Won & Closed",
    status: "won_closed",
  },
  {
    to: "/user-jobs?type=weekly&status=won_closed_values",
    label: "Revenue Generated",
    status: "won_closed_values",
  },
];
const monthlyDataToMap = [
  {
    to: "/user-jobs?type=monthly&status=new_leads",
    label: "New Leads",
    status: "new_leads",
  },
  {
    to: "/user-jobs?type=monthly&status=won_closed",
    label: "Won & Closed",
    status: "won_closed",
  },
  {
    to: "/user-jobs?type=monthly&status=won_closed_values",
    label: "Revenue Generated",
    status: "won_closed_values",
  },
];

export default function TotalUserJobs({ dataDashboard }) {
  return (
    <Card className="md:row-start-2 md:row-end-4">
      <h2 className="col-span-full text-lg font-semibold tracking-wide mb-4">
        This Week
      </h2>
      <div className="grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] gap-3 w-full mb-12">
        {weeklyDataToMap.map((data) => (
          <JobCard
            to={data.to}
            label={data.label}
            number={dataDashboard?.["weekly"]?.[data.status]}
            className="w-full h-full"
          />
        ))}
      </div>

      <h2 className="col-span-full text-lg font-semibold tracking-wide mb-3">
        Month to Date
      </h2>
      <div className="grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] gap-3 w-full">
        {monthlyDataToMap.map((data) => (
          <JobCard
            to={data.to}
            label={data.label}
            number={
              data?.status === "won_closed_values"
                ? formatCurrency(dataDashboard?.["monthly"]?.[data.status])
                : dataDashboard?.["monthly"]?.[data.status]
            }
            className="w-full h-full"
          />
        ))}
      </div>
    </Card>
  );
}
