import React, { useState } from "react";
import { TableRows } from "@components";

const PaySheetTable = () => {
  const [rows, setRows] = useState([
    { material: "", quantity: "", color: "", orderKey: "" },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { material: "", quantity: "", color: "", orderKey: "" }]);
  };

  const handleAddSameRow = () => {
    handleAddRow();
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (e, index, field) => {
    const newRows = [...rows];
    newRows[index][field] = e.target.value;
    setRows(newRows);
  };

  const handleSelectChange = (e, index, field) => {
    const newRows = [...rows];
    newRows[index][field] = e.target.value;
    setRows(newRows);
  };
  return (
    <table className="w-full bg-white border rounded">
      <thead>
        <tr className="text-center">
          <th className="px-4 py-2 border-b">Quantity</th>
          <th className="px-4 py-2 border-b">Details</th>
          <th className="px-4 py-2 border-b">Unit Price</th>
          <th className="px-4 py-2 border-b">Line Total</th>
          <th className="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRows
            key={index}
            rowIndex={index}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleAddSameRow={handleAddSameRow}
            handleDeleteRow={handleDeleteRow}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PaySheetTable;
