import React, { useEffect, useState } from "react";
import { Row } from "@components/Forms";

const AddMaterialForm = ({ register, control, defaultValue }) => {
  const [rows, setRows] = useState([
    { material: "", quantity: "", color: "", orderKey: "" },
  ]);
  useEffect(() => {
    if (defaultValue?.materials?.length > 0) setRows(defaultValue.materials);
  }, [defaultValue]);

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

  return (
    <table className="w-full bg-white border rounded">
      <thead>
        <tr className="text-center">
          <th className="px-4 py-2 border-b">Material</th>
          <th className="px-4 py-2 border-b">Quantity</th>
          <th className="px-4 py-2 border-b">Color</th>
          <th className="px-4 py-2 border-b">Order Key</th>
          <th className="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <Row
            key={index}
            rowIndex={index}
            handleAddSameRow={handleAddSameRow}
            handleDeleteRow={handleDeleteRow}
            register={register}
            control={control}
            defaultValue={rows[index]}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AddMaterialForm;
