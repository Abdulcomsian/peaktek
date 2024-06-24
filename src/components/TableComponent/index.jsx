import { Table } from "antd";

const TableComponent = ({
  columns,
  dataSource,
  pagination = false,
  scroll,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      scroll={scroll}
      bordered
    />
  );
};

export default TableComponent;
