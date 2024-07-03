import React, { useState } from "react";
import { Row } from "@components/Forms";
import TableComponent from "@components/TableComponent";

const columns = ["Material", "Quantity", "Color", "Order Key", "Actions"];

const AddMaterialForm = () => {
  // const [rows, setRows] = useState([
  //   { material: "", quantity: "", color: "", orderKey: "" },
  // ]);

  // const handleAddRow = () => {
  //   setRows([...rows, { material: "", quantity: "", color: "", orderKey: "" }]);
  // };

  // const handleAddSameRow = () => {
  //   handleAddRow();
  // };

  // const handleDeleteRow = (index) => {
  //   const newRows = rows.filter((_, i) => i !== index);
  //   setRows(newRows);
  // };

  // const handleInputChange = (e, index, field) => {
  //   const newRows = [...rows];
  //   newRows[index][field] = e.target.value;
  //   setRows(newRows);
  // };

  // const handleSelectChange = (e, index, field) => {
  //   const newRows = [...rows];
  //   newRows[index][field] = e.target.value;
  //   setRows(newRows);
  // };
  return <TableComponent columns={columns} />;
};

export default AddMaterialForm;
