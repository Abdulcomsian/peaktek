import React, { useState } from "react";

const Row = ({
  rowIndex,
  handleInputChange,
  handleSelectChange,
  handleAddSameRow,
  handleDeleteRow,
}) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleSelectChange(e, rowIndex, "material")}
        >
          <option value="Material 1">Material 1</option>
          <option value="Material 2">Material 2</option>
          <option value="Material 3">Material 3</option>
        </select>
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          className="w-full p-2 border rounded"
          onChange={(e) => handleInputChange(e, rowIndex, "quantity")}
        />
      </td>
      <td className="px-4 py-2">
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => handleSelectChange(e, rowIndex, "color")}
        >
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
        </select>
      </td>
      <td className="px-4 py-2">
        <input
          type="text"
          className="w-full p-2 border rounded"
          onChange={(e) => handleInputChange(e, rowIndex, "orderKey")}
        />
      </td>
      <td className="px-4 py-2 text-center">
        {rowIndex === 0 ? (
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleAddSameRow}
          >
            Add Row
          </button>
        ) : (
          <>
            <button
              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => handleAddSameRow(rowIndex)}
            >
              +
            </button>
            <button
              className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => handleDeleteRow(rowIndex)}
            >
              -
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

const AddMaterialPage = () => {
  const [rows, setRows] = useState([
    { material: "", quantity: "", color: "", orderKey: "" },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { material: "", quantity: "", color: "", orderKey: "" }]);
  };

  const handleAddSameRow = (index) => {
    const newRow = { ...rows[index] };
    const newRows = [...rows];
    newRows.splice(index + 1, 0, newRow);
    setRows(newRows);
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
    <div className="p-4">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
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
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleAddSameRow={handleAddSameRow}
              handleDeleteRow={handleDeleteRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddMaterialPage;
