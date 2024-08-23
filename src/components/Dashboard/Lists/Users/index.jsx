import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@components/JobDetails/Button";
import AddUser from "@components/Modals/AddUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData, STATUS } from "@store/slices/usersSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { usersData, status } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    // Fetch all users data without pagination params
    dispatch(fetchUsersData({}));
  }, [dispatch]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to refetch users data
  const handleUserAdded = () => {
    dispatch(fetchUsersData({}));
    closeModal(); // Close the modal after fetching new data
  };

  // Define columns inside the component so that `pagination` can be accessed
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
      width: "45%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "45%",
    },
  ];

  // Paginate data based on current page and page size
  const paginatedData = usersData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
          Users List
        </h1>
        <Button
          className="w-full max-w-28 text-white btn-gradient px-4 py-2"
          onClick={openModal}
        >
          Add User
        </Button>
      </div>
      <div className="flex justify-center">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={paginatedData}
          pagination={{
            ...pagination,
            total: usersData.length, // Total number of items for pagination
          }}
          loading={status === STATUS.LOADING}
          size="large"
          className="w-full max-w-4xl"
          onChange={handleTableChange}
          bordered
        />
      </div>
      {showModal && (
        <AddUser
          roleId={5}
          heading="Create New User"
          open={showModal}
          onOk={handleUserAdded} // Pass the handleUserAdded function to refetch and close modal
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Users;
