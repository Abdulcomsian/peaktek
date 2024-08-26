import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@components/JobDetails/Button";
import AddUser from "@components/Modals/AddUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdjustorData } from "@store/slices/adjustorSlice";

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

const Adjustors = () => {
  const dispatch = useDispatch();
  const { adjustorData, total, status } = useSelector(
    (state) => state?.adjustors
  );
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(
      fetchAdjustorData({
        page: pagination.current,
        pageSize: pagination.pageSize,
      })
    );
  }, [dispatch, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
          Adjustors List
        </h1>
        <Button
          className="text-white btn-gradient px-4 py-2"
          onClick={openModal}
        >
          Add Adjustor
        </Button>
      </div>
      <div className="flex justify-center">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={adjustorData}
          pagination={{
            ...pagination,
            total: total,
          }}
          loading={status === "loading"}
          size="large"
          className="w-full max-w-4xl"
          onChange={handleTableChange}
          bordered
        />
      </div>
      {showModal && (
        <AddUser
          roleId={6}
          heading="Create New Adjustor"
          open={showModal}
          onOk={closeModal}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Adjustors;
