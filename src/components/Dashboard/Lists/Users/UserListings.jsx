import { Table, Select, DatePicker, Button, Tag } from "antd";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUsersData, STATUS } from "@store/slices/usersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import EditUserDrawer from "@components/EditUser";
import { getFilteredUsers, getSearchedUsers, getUser } from "@services/apiUser";
import toast from "react-hot-toast";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const userPermissionOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "9",
    label: "Job admin",
  },
  {
    value: "8",
    label: "Basic",
  },
];

function tableDataPreparation(data) {
  return data.map((item) => ({
    id: item.id,
    status: item.status,
    name: `${item.first_name} ${item.last_name}`,
    email: item.email,
    company: item.company.name,
    permission_level: item.role_id === "9" ? "Job Admin" : "Basic",
    dataToEdit: item,
  }));
}

export default function UserListings({ onRevalidatePage }) {
  const { logout, user } = useAuth();
  const isAllowedToEditUser =
    user?.role?.name === "Company" || user?.role?.name === "Site Admin";
  const navigate = useNavigate();
  const [companyUser, setCompanyUser] = useState([]);
  const [revalidatePage, setRevalidatePage] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilteValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  let searchedData;

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const fetchCompanyUsers = async () => {
    setIsLoading(true);
    try {
      const resp = await getUser();
      console.log(
        "user respo",
        resp.data.data.map((item) => item.role_id)
      );
      if (resp.status >= 200 && resp.status < 300) {
        const data = resp.data.data;
        const dataTable = tableDataPreparation(data);
        console.log("DDATA TABLE", dataTable);
        setCompanyUser(dataTable);
      }

      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      render: (tag) => (
        <Tag color={tag === "active" ? "green" : "default"}>
          {tag.replace(tag[0], tag[0].toUpperCase())}
        </Tag>
      ),
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Company",
      dataIndex: "company",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: () => "PeakTek",
      width: "20%",
    },
    {
      title: "User Permission Level",
      dataIndex: "permission_level",
      width: "20%",
    },
  ];

  if (isAllowedToEditUser)
    columns.push({
      title: "",
      dataIndex: "dataToEdit",
      render: (item) => (
        <EditUserDrawer
          item={item}
          onRevalidatePage={() => setRevalidatePage((is) => !is)}
        />
      ),
      width: "100%",
    });

  useEffect(() => {
    fetchCompanyUsers();
  }, [revalidatePage, onRevalidatePage]);

  useEffect(() => {
    const fetchFilterdData = async function () {
      setIsFiltering(true);
      try {
        const resp = await getFilteredUsers(filterValue);
        console.log("filtered resp", resp);
        if (resp.status >= 200 && resp.status < 300) {
          const tableData = tableDataPreparation(resp.data.data);
          setCompanyUser(tableData);
        }
      } finally {
        setIsFiltering(false);
      }
    };
    if (filterValue !== "all") fetchFilterdData();
    else {
      fetchCompanyUsers();
    }
  }, [filterValue]);

  useEffect(() => {
    console.log(searchQuery);
    console.log(companyUser);
    const fetchSeachedData = async function () {
      setIsSearching(true);
      try {
        const resp = await getSearchedUsers(searchQuery);
        console.log("Searched data resp", resp);
        const tableData =
          resp.data.data.length > 0 ? tableDataPreparation(resp.data.data) : [];
        setCompanyUser(tableData);
      } finally {
        setIsSearching(false);
      }
    };
    if (searchQuery.length > 0) {
      fetchSeachedData();
    } else fetchCompanyUsers();
  }, [searchQuery]);

  const paginatedData = companyUser?.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <>
      <div className="flex flex-row items-center gap-8">
        <Search
          className="w-1/2"
          size="large"
          placeholder="Search user name, email ..."
          onSearch={(value) => setSearchQuery(value)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          defaultValue="all"
          size="large"
          className="w-1/2"
          options={userPermissionOptions}
          onChange={(value) => setFilteValue(value)}
        />
      </div>

      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={paginatedData}
        pagination={{
          ...pagination,
          total: companyUser.length,
        }}
        loading={isLoading || isFiltering || isSearching}
        size="middle"
        className="w-full mt-6"
        onChange={handleTableChange}
        bordered
      />
    </>
  );
}
