import { BreadCrumb } from "@components/UI";
import { Outlet, useLocation } from "react-router-dom";
import { MainTabs, Header } from "@components/JobDetails";

export default function JobDetail() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <div className="bg-bluish min-h-full p-5">
      <Header companyName="Company Name" className="mb-4">
        <BreadCrumb items={[{ title: "Dashboard" }, { title: "Leads" }]} />
      </Header>
      <MainTabs className="mb-4" currentPath={currentPath} />
      <div className="hidden md:block">
        <Outlet />
      </div>
    </div>
  );
}
