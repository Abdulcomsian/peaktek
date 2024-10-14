import { Table, Select, DatePicker, Button } from "antd";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUsersData, STATUS } from "@store/slices/usersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import EditUserDrawer from "@components/EditUser";
const { Search } = Input;

const userPermissionOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "siteAdmin",
    label: "Site admin",
  },
  {
    value: "jobAdmin",
    label: "Job admin",
  },
  {
    value: "basic",
    label: "Basic",
  },
];

export default function UserListings() {
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
      render: (text, record, index) =>
        index +
        1 +
        (parseInt(pagination.current) - 1) * parseInt(pagination.pageSize),
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
      render: () => <EditUserDrawer />,
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
          placeholder="Search user name, email ..."
          onSearch={(value) => console.log(value)}
        />
        <Select
          defaultValue="all"
          size="large"
          className="w-1/2"
          options={userPermissionOptions}
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
