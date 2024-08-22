import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@components/JobDetails/Button";
import AddUser from "@components/Modals/AddUsers";
import { clientBaseURL, clientEndPoints } from "@services/config";

const columns = [
  {
    title: "Sr No",
    dataIndex: "srNo",
    render: (text, record, index) => index + 1,
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

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      setLoading(true);
      const response = await clientBaseURL.get(
        `${clientEndPoints?.getCompanyUsers}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response in user list", response);
      if (response?.status >= 200 && response?.status < 300) {
        const users = response.data.data;
        setData(users);
      }
    } catch (error) {
      if (error?.response) {
        console.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const openModel = () => {
    setShowModal(true);
  };

  const closeModel = () => {
    setShowModal(false);
  };

  // Calculate the data to be displayed based on current pagination
  const paginatedData = data?.slice(
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
          onClick={openModel}
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
            total: data?.length,
          }}
          loading={loading}
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
          onOk={closeModel}
          onCancel={closeModel}
        />
      )}
    </div>
  );
};

export default Users;
