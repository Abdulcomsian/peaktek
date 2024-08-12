import { useState } from "react";
import { Input, Button } from "@components";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { createCustomer } from "@store/slices/customerSlice";

const initialFormData = {
  customerName: "",
  email: "",
  phone: "",
};

export default function CustomerDetailModal({
  open,
  onCancel,
  onOk,
  onAddTitle,
}) {
  const [formState, setFormState] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleChange = function (e) {
    setFormState((formState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomer(formState));
    onOk();
  };
  return (
    <Modal open={open} onCancel={onCancel} onOk={onOk} footer={null}>
      <h2 className="text-center text-xl">Customer details</h2>
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-4"
          applyMarginBottom={true}
          label="Name"
          placeholder="Customer Name"
          name="customerName"
          value={formState.customerName}
          onChange={handleChange}
        />
        <Input
          className="mb-4"
          type="email"
          applyMarginBottom={true}
          label="Email (optional)"
          placeholder="Enter address"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <Input
          className="mb-4"
          applyMarginBottom={true}
          label="Phone (optional)"
          placeholder="Phone number"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          type="number"
        />
        <div className="flex items-center justify-center gap-2">
          <Button className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-400 text-black">
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-300 hover:bg-blue-500 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
