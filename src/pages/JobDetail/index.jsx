import { BreadCrumb } from "@components/UI";
import { Outlet, useNavigate, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobApi } from "@services/apiJobs";
import { useAuth } from "@context/AuthContext";
import CenteredSpinner from "@components/CenteredSpinner";
import { MainTabs, Header } from "@components/JobDetails";

export default function JobDetail() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetail] = useState();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-bluish min-h-full p-5">
      <Header companyName="Company Name" className="mb-4">
        <BreadCrumb items={[{ title: "Dashboard" }, { title: "Leads" }]} />
      </Header>
      <MainTabs className="mb-4" />
      <div className="hidden md:block">
        <Outlet />
      </div>
    </div>
  );
}
