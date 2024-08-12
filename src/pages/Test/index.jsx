import React, { useState } from "react";

export default function index() {
  const [state, setState] = useState([
    {
      id: 67,
      name: "input",
      order_key: 23,
    },
    {
      id: 45,
      name: "input",
      order_key: 23,
    },
    {
      id: 89,
      name: "input",
      order_key: 23,
    },
  ]);

  const handleChange = function (e) {
    let key = e.target.dataset.key;
    let arrayIs = state;
    let name = e.target.name;
    arrayIs[key][name] = e.target.value;
    setState(arrayIs);
  };
  return (
    <>
      {state.map((data, index) => (
        <div>
          <input
            name={name}
            style={{ border: "1px solid red" }}
            onChange={handleChange}
            data-key={index}
          />
          <input
            name={name}
            style={{ border: "1px solid red" }}
            onChange={handleChange}
            data-key={index}
          />
        </div>
      ))}
    </>
  );
}
