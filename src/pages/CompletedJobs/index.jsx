import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { JobDetailModal } from "@components/Modals";
import LinkButton from "@components/UI/LinkButton";

const CompletedJobs = () => {
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Address",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <LinkButton onClick={() => handleOpenModal(record)}>
          View Job details
        </LinkButton>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: "herly 23, Auston",
      tasks: "Tasks",
    },
  ];

  const handleOpenModal = (record) => {
    console.log("Open modal for:", record);
    setModalVisible(true);
    // Additional logic to handle specific record or data can be added here
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      {modalVisible && (
        <JobDetailModal
          open={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

export default CompletedJobs;
