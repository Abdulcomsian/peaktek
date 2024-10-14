import { Table, Select, DatePicker, Button, Tag } from "antd";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUsersData, STATUS } from "@store/slices/usersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import EditUserDrawer from "@components/EditUser";
import EditCompanyDrawer from "@components/EditCompany";
const { Search } = Input;

const statusFilterData = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "in_active",
    label: "Inactive",
  },
];

export default function CompanyList() {
  const dispatch = useDispatch();
  const { usersData, status } = useSelector((state) => state.users);
  console.log("USER DATA", usersData);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleUserEdit = function (column_data) {
    console.log("HANLDE EDIT CLICKED", column_data);
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      tags: ["cool", "teacher"],
      render: (tags) => <Tag color="green">Active</Tag>,
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
      render: () => "Site Admin",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "",
      render: () => <EditCompanyDrawer />,
      width: "100%",
    },
  ];

  useEffect(() => {
    dispatch(fetchUsersData()); // Dispatch the action to fetch user data
  }, [dispatch]);

  const paginatedData = usersData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <>
      <div className="flex flex-row items-center gap-8">
        <Search
          className="w-1/2"
          size="large"
          placeholder="Search company name ..."
          onSearch={(value) => console.log(value)}
        />
        <Select
          defaultValue="all"
          size="large"
          className="w-1/2"
          options={statusFilterData}
        />
      </div>

      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={paginatedData}
        pagination={{
          ...pagination,
          total: usersData.length,
        }}
        loading={status === STATUS.LOADING}
        size="large"
        className="w-full mt-6"
        onChange={handleTableChange}
        bordered
      />
    </>
  );
}
