import { useState } from "react";
import { Input } from "@components";
import { Modal, Select } from "antd";
import SelectInput from "@components/SelectInput";

const roleOptions = [
  {
    value: "client",
    label: "Client",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "designer",
    label: "Designer",
  },
];

const initialState = {
  username: "",
  email: "",
  role: null,
};

function NewUserModal({ open, onCancel, onOk, onAddUser }) {
  const [state, setState] = useState(initialState);
  const [role, setRole] = useState(() => roleOptions.at(0).value);

  const handleChange = function (e) {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role || !state.username) return;

    const newUser = {
      key: crypto.randomUUID,
      name: state.username,
      email: state.email,
      role: role,
    };
    onAddUser(newUser);
    onOk();
  };

  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <h1 className="text-center text-xl font-semibold my-4">
        Create new user
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          applyMarginBottom={true}
          label="Name"
          placeholder="User Name"
          value={state.name}
          className="mb-4"
          name="username"
          onChange={handleChange}
        />
        <Input
          type="email"
          applyMarginBottom={true}
          label="Email"
          placeholder="Email Address"
          value={state.email}
          className="mb-4"
          name="email"
          onChange={handleChange}
        />
        <SelectInput
          label="Role"
          defaultValue={role}
          size="large"
          className="w-full"
          options={roleOptions}
          onChange={(value) => {
            setRole(value);
          }}
        />
        <div className="flex justify-center">
          <button
            type="Submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          >
            Add User
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default NewUserModal;
