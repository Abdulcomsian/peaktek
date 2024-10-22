import { useEffect } from "react";
import { BreadCrumb, Loader } from "@components/UI";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { MainTabs, Header } from "@components/JobDetails";
import { useDispatch } from "react-redux";
import { fetchSingleJob } from "@store/slices/JobsSlice";
import { useSelector } from "react-redux";

export default function JobDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const customerName = useSelector((state) => state.jobs.singleJobData.name);
  const status = useSelector((state) => state.jobs.status);
  const isLoadingCustomerName = status === "loading";
  console.log("current job", customerName, status);
  useEffect(() => {
    dispatch(fetchSingleJob(id));
  }, [id]);
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <div className="bg-white min-h-full p-5 rounded-3xl px-8 mx-8">
      <Header
        companyName={
          isLoadingCustomerName ? (
            <Loader width="24px" height="24px" color="#000" />
          ) : (
            customerName
          )
        }
        className="mb-4"
      >
        <BreadCrumb items={[{ title: "Dashboard" }, { title: "Leads" }]} />
      </Header>
      <MainTabs className="mb-4" currentPath={currentPath} />
      <div className="hidden md:block">
        <Outlet />
      </div>
    </div>
  );
}
