import React, { useEffect, useState } from "react";
import { Table, Select, DatePicker } from "antd";
import Button from "@components/JobDetails/Button";
import AddUser from "@components/Modals/AddUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData, STATUS } from "@store/slices/usersSlice";
import moment from "moment";
import { InputContainer } from "@components/index";
import { useAuth } from "@context/AuthContext";

const { RangePicker } = DatePicker;

const Users = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { usersData, status } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Track selected user IDs
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [dateRange, setDateRange] = useState(null); // Track selected date range
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  console.log("StoredUser =>", user);

  console.log("User Data New=>", usersData);

  const leadSources = [
    { label: "Door Knocking", value: "Door Knocking" },
    { label: "Customer Referral", value: "Customer Referral" },
    { label: "Call In", value: "Call In" },
    { label: "Facebook", value: "Facebook" },
    { label: "Family Member", value: "Family Member" },
    { label: "Home Advisor", value: "Home Advisor" },
    { label: "Website", value: "Website" },
    { label: "Social Encounter", value: "Social Encounter" },
  ];
  useEffect(() => {
    // Fetch all users data
    dispatch(fetchUsersData({}));
  }, [dispatch]);

  useEffect(() => {
    // Filter data based on selected user IDs and date range
    let filtered = usersData;

    // Filter by selected users
    if (selectedUserIds.length > 0) {
      filtered = filtered.filter((user) =>
        selectedUserIds.includes(`${user.id}`)
      );
    }

    // Filter by date range
    if (dateRange) {
      const [startDate, endDate] = dateRange;

      filtered = filtered.filter((user) =>
        moment(user.created_at).isBetween(
          moment(startDate).startOf("day"), // Start of the selected day
          moment(endDate).endOf("day"), // End of the selected day
          null,
          "[]"
        )
      );
    }

    setFilteredUsers(filtered);
  }, [selectedUserIds, dateRange, usersData]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUserAdded = () => {
    dispatch(fetchUsersData({}));
    closeModal();
  };

  const handleUserSelect = (selectedValues) => {
    setSelectedUserIds(selectedValues);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srNo",
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
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "30%",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (created_at) => moment(created_at).format("YYYY-MM-DD"),
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
      width: "30%",
    },
  ];

  const paginatedData = filteredUsers.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div style={{ textAlign: "right" }}>
        <Button
          className="w-full max-w-28 text-white btn-gradient px-4 py-2 "
          onClick={openModal}
        >
          Add User
        </Button>
      </div>

      <div className="flex justify-between mb-6 items-center">
        <div style={{ width: "100%" }}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-start space-x-6 mt-2">
              {/* Select User */}
              <div className="flex flex-col w-1/2">
                <label className="font-medium text-sm mb-1">Select User</label>
                <Select
                  mode="multiple"
                  placeholder="Select users"
                  options={usersData.map((user) => ({
                    value: `${user.id}`,
                    label: user.name,
                  }))}
                  onChange={handleUserSelect}
                  className="text-sm"
                />
              </div>

              {/* Lead Source */}
              <div className="flex flex-col w-1/2">
                <label className="font-medium text-sm mb-1">Lead Source</label>
                <Select
                  mode="multiple"
                  placeholder="Select lead source"
                  options={leadSources}
                  onChange={handleUserSelect}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="flex flex-row items-start space-x-6 mt-2">
              {/* Select Date */}
              <div className="flex flex-col w-full">
                <label className="font-medium text-sm mb-1">Select Date</label>
                <RangePicker
                  style={{ height: "40px" }}
                  onChange={handleDateChange}
                  className="w-full text-sm"
                  format="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Table
          style={{ width: "100%" }}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={paginatedData}
          pagination={{
            ...pagination,
            total: filteredUsers.length,
          }}
          loading={status === STATUS.LOADING}
          size="large"
          className="w-full"
          onChange={handleTableChange}
          bordered
        />
      </div>

      {showModal && (
        <AddUser
          roleId={user.role_id}
          heading="Create New User"
          open={showModal}
          onOk={handleUserAdded}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
