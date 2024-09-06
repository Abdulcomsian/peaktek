import { Radio } from "antd";

export default function RadioButton({ onChange, value, items = [] }) {
  return (
    <Radio.Group onChange={onChange} value={value}>
      {items.map((item) => (
        <Radio value={item.value}>{item.label}</Radio>
      ))}
    </Radio.Group>
  );
}
