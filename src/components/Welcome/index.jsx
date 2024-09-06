import { useAuth } from "@context/AuthContext";
import { getDashboardStats } from "@services/apiDashboard";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Welcome() {
  const [dataDashboard, setDataDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { customers, deals_won_closed } = dataDashboard;
  const navigate = useNavigate();
  const { logout } = useAuth();

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
  }, []);

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
    <div className="px-5 py-4 max-w-screen-lg grid grid-cols-3 gap-x-6">
      <div className="text-blue-100 bg-[#26bbd8] grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-semibold">Customers</p>
        <p className="text-3xl font-bold">{customers}</p>
      </div>
      {/* <div className="text-blue-100 bg-[#28acd1] grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-semibold">Commissions</p>
        <p className="text-3xl font-bold">$8,690.90</p>
      </div> */}
      <div className="text-blue-100 bg-[#5261a3] grow py-5 text-center rounded-3xl space-y-2">
        <p className="text-xl font-semibold">Deals Won & Closed</p>
        <p className="text-3xl font-bold">${deals_won_closed}</p>
      </div>

      <h2 className="col-span-full mt-6 text-medium text-[#26bbd8]">
        This Week...
      </h2>
      <Link to={`/user-jobs?type=weekly&status=new_leads`}>
        <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
          <p className="text-xl font-medium">New Leads</p>
          <p className="text-3xl font-bold">
            {dataDashboard?.["weekly"]?.new_leads}
          </p>
        </div>
      </Link>

      <Link to={`/user-jobs?type=weekly&status=won_closed`}>
        <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
          <p className="text-xl font-medium">Won & Closed</p>
          <p className="text-3xl font-bold">
            {dataDashboard?.["weekly"]?.won_closed}
          </p>
        </div>
      </Link>

      <Link to={`/user-jobs?type=weekly&status=won_closed_values`}>
        <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
          <p className="text-xl font-medium">Won & Closed value</p>
          <p className="text-3xl font-bold">
            {dataDashboard?.["weekly"]?.won_closed_values}
          </p>
        </div>
      </Link>

      <h2 className="col-span-full mt-6 text-medium text-[#26bbd8]">
        This Month...
      </h2>
      <Link to={`/user-jobs?type=monthly&status=new_leads`}>
        <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
          <p className="text-xl font-medium">New Leads</p>
          <p className="text-3xl font-bold">
            {dataDashboard?.["monthly"]?.new_leads}
          </p>
        </div>
      </Link>
      <Link to={`/user-jobs?type=monthly&status=won_closed`}>
        <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
          <p className="text-xl font-medium">Won & Closed</p>
          <p className="text-3xl font-bold">
            {dataDashboard?.["monthly"]?.won_closed}
          </p>
        </div>
      </Link>
      <Link to={`/user-jobs?type=monthly&status=won_closed_values`}>
        <div className="text-stone-900 bg-stone-200 grow py-5 text-center rounded-3xl space-y-2">
          <p className="text-xl font-medium">Won & Closed value</p>
          <p className="text-3xl font-bold">
            ${dataDashboard?.["monthly"]?.won_closed_values}
          </p>
        </div>
      </Link>
    </div>
  );
}
