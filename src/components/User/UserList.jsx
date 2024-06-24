import React from "react";
import { Table, Typography } from "antd";
const { Text } = Typography;

const fixedColumns = [
  {
    title: "Name",
    dataIndex: "name",
    fixed: true,
    width: 100,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
];
const fixedData = [];
for (let i = 0; i < 3; i += 1) {
  fixedData.push({
    key: i,
    name: ["User-1", "User-2", "User-3"][i % 3],
    email: [
      "expample-1@gmail.com",
      "expample-2@gmail.com",
      "expample-3@gmail.com",
    ][i % 3],
    role: ["Admin", "Manager", "User"][i % 3],
  });
}
const UserList = () => (
  <>
    <Table
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={false}
      scroll={{
        x: "100%",
        y: "100%",
      }}
      bordered
    />
  </>
);
export default UserList;
