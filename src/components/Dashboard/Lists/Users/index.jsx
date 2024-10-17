import { useState } from "react";
import { Card, Tabs } from "@components/UI";
import AddNewUser from "@components/AddNewUser";
import UserListings from "./UserListings";
import CompanyList from "../CompanyList";
import AddNewCompany from "@components/AddNewCompany";
import { useAuth } from "@context/AuthContext";

const tabUserListings = [
  { id: 1, title: "User List" },
  { id: 2, title: "Company List" },
];

const Users = () => {
  const [currTab, setCurrTab] = useState(1);
  const { logout, user: userData } = useAuth();
  const isCompany = userData.role.name === "Company";
  const isSuperAdmin = userData?.role?.name === "Super Admin";
  const [revalidatePage, setRevalidatePage] = useState(false);

  return (
    <>
      <div className="relative">
        <h1 className="font-bold text-3xl uppercase pl-8">Users</h1>
        <div class=" bottom-0 h-1 w-[200px] inset-0 bg-gradient-to-r from-[#277cb8] via-[#2590c2] to-[#20b6d5] rounded-tr-lg rounded-br-lg"></div>
      </div>
      <Card className=" px-8 mx-8 mt-4">
        <div className="flex items-center justify-between mt-4">
          <div>
            <Tabs
              items={tabUserListings}
              activeTab={currTab}
              onClick={setCurrTab}
            />
          </div>
          {currTab === 1 ? (
            isCompany ? (
              <AddNewUser
                onRevalidatePage={() => setRevalidatePage((is) => !is)}
              />
            ) : null
          ) : isSuperAdmin ? (
            <AddNewCompany />
          ) : null}
        </div>

        {currTab === 1 ? (
          <UserListings onRevalidatePage={revalidatePage} />
        ) : (
          <CompanyList />
        )}
      </Card>
    </>
  );
};

export default Users;
