import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Button from "@components/JobDetails/Button";
import AddUser from "@components/Modals/AddUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubContractors } from "@store/slices/subContractorSlice";

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
    render: (name) => `${name}`,
    width: "45%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "45%",
  },
];

const SubContractors = () => {
  const dispatch = useDispatch();
  const { subContractorsData, total, status } = useSelector(
    (state) => state.subContractors
  );
  const [showModal, setShowModal] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const fetchData = () => {
    dispatch(
      fetchSubContractors({
        page: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination.current,
    tableParams.pagination.pageSize,
    dispatch,
  ]);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setTableParams({
        pagination: {
          current: 1,
          pageSize: pagination.pageSize,
        },
      });
    } else {
      setTableParams({
        pagination,
      });
    }
  };

  const openModel = () => {
    setShowModal(true);
  };

  const closeModel = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <div className="flex justify-between mb-6">
        <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
          Sub Contractors List
        </h1>
        <Button
          className=" text-white btn-gradient px-4 py-2"
          onClick={openModel}
        >
          Add Sub Contractor
        </Button>
      </div>
      <div className="flex justify-center">
        <Table
          columns={columns}
          rowKey={(record) => record.id} // Use a unique identifier for row key
          dataSource={subContractorsData}
          pagination={{
            ...tableParams.pagination,
            total: total, // Set total for pagination
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
          roleId={3}
          heading="Create New Sub Contractor"
          open={showModal}
          onOk={closeModel}
          onCancel={closeModel}
        />
      )}
    </div>
  );
};

export default SubContractors;
