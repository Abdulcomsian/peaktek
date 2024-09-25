import AddNewJob from "@components/AddNewJob";
import { useAuth } from "@context/AuthContext";
import { getDashboardStats } from "@services/apiDashboard";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import CurrentJobs from "./CurrentJobs";
import NeedAtthentionBox from "./NeedAtthentionBox";
import TotalUserJobs from "./TotalUserJobs";
import YearToDateSection from "./YearToDateSection";

export default function Welcome() {
  const [invalidatePage, setInvalidatePage] = useState(false);
  const [dataDashboard, setDataDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { current_jobs, current_year, needs_attention } = dataDashboard;

  useEffect(() => {
    async function fetchDashbordStats() {
      setIsLoading(true);
      try {
        const resp = await getDashboardStats();
        if ((resp.status >= 200) & (resp.status < 300)) {
          setDataDashboard(resp.data.data);
        }
        if (resp.status === 401) {
          logout();
          navigate("/");
        }
        console.log(resp);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashbordStats();
  }, [invalidatePage]);

  if (isLoading)
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#18faf8"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="flex item-center justify-center"
      />
    );

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-black text-3xl">Dashbord</h2>
        <AddNewJob onJobAdded={setInvalidatePage} />
      </div>
      <div className="grid grid-cols-[1fr] md:grid-cols-[1fr_30%] md:grid-rows-[200px_150px_auto] gap-6 ">
        <CurrentJobs currentJobs={current_jobs} />
        <NeedAtthentionBox listOfAttentions={needs_attention} />
        <TotalUserJobs dataDashboard={dataDashboard} />
        <YearToDateSection totalRevenue={current_year} />
      </div>
      <div className="px-5 py-4 max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
    </>
  );
}
