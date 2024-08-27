import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function Index() {
  const [state, setState] = useState([
    {
      id: uuidv4(),
      name: "input",
      order_key: 23,
    },
    {
      id: uuidv4(),
      name: "input",
      order_key: 23,
    },
    {
      id: uuidv4(),
      name: "input",
      order_key: 23,
    },
  ]);

  const handleChange = function (e) {
    let key = e.target.dataset.key;
    let name = e.target.name;
    let value = e.target.value;

    // Create a new state array
    let updatedState = [...state];

    // Update the specific item in the new array
    updatedState[key] = {
      ...updatedState[key],
      [name]: value,
    };

    // Set the new state
    setState(updatedState);
  };

  const handleAddInput = function () {
    setState((items) => [...items, { id: uuidv4() }]);
  };

  const handleDelete = function (id) {
    setState((items) => items.filter((item) => item.id !== id));
  };

  return (
    <>
      {state.map((data, index) => (
        <div key={data.id}>
          <input
            name="name" // Ensure the correct name attribute
            value={data.name} // Bind input value to the state
            style={{ border: "1px solid red" }}
            onChange={handleChange}
            data-key={index}
          />
          <button onClick={() => handleDelete(data.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddInput}>Add input</button>
    </>
  );
}
