import LinkButton from "@components/UI/LinkButton";
import TableComponent from "../../../TableComponent";
import { Button } from "../../..";
import { useState } from "react";
import { NewUserModal } from "@components/Modals";

const initialColumns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Role",
    dataIndex: "role",
  },
];

const initialData = [
  {
    key: "1",
    name: "John deli Brown",
    email: "example@gmail.com",
    role: "Manager",
  },
];

function ManageUser() {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = function (newUser) {
    setData((data) => [...data, newUser]);
  };
  return (
    <>
      <Button
        variant="gradient"
        className="float-right"
        onClick={() => setShowModal(true)}
      >
        Add User
      </Button>
      <TableComponent columns={columns} dataSource={data} />
      <NewUserModal
        open={showModal}
        onOk={() => setShowModal((is) => !is)}
        onCancel={() => setShowModal((is) => !is)}
        onAddUser={handleAddUser}
      />
    </>
  );
}

export default ManageUser;
