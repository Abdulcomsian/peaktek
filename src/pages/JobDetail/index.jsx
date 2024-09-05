import { useEffect } from "react";
import { BreadCrumb } from "@components/UI";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { MainTabs, Header } from "@components/JobDetails";
import { useDispatch } from "react-redux";
import { fetchSingleJob } from "@store/slices/JobsSlice";

export default function JobDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [id]);
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
