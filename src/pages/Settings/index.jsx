import { useState } from "react";
import { Card, Tabs } from "@components/UI";
import AddNewUser from "@components/AddNewUser";
import AddNewCompany from "@components/AddNewCompany";
import { useAuth } from "@context/AuthContext";
import UserListings from "@components/Dashboard/Lists/Users/UserListings";
import CompanyList from "@components/Dashboard/Lists/CompanyList";
import PersonalInfoSettings from "@components/Forms/PersonalInfoSettings";
import JobInformation from "@components/Forms/JobInformation";

const tabSettings = [
  { id: 1, title: "My Profile" },
  { id: 2, title: "Password" },
];

const Settings = () => {
  const [currTab, setCurrTab] = useState(1);

  return (
    <>
      <div className="relative">
        <h1 className="font-bold text-3xl uppercase pl-8">Settings</h1>
        <div class=" bottom-0 h-1 w-[200px] inset-0 bg-gradient-to-r from-[#277cb8] via-[#2590c2] to-[#20b6d5] rounded-tr-lg rounded-br-lg"></div>
      </div>
      <Card className=" px-8 mx-8 mt-4">
        <div>
          <Tabs items={tabSettings} activeTab={currTab} onClick={setCurrTab} />
        </div>

        {currTab === 1 ? <PersonalInfoSettings /> : <JobInformation />}
      </Card>
    </>
  );
};

export default Settings;
