import { Radio } from "antd";

export default function RadioButton({ onChange, value, items = [], disabled }) {
  return (
    <Radio.Group onChange={onChange} value={value} disabled={disabled}>
      {items.map((item) => (
        <Radio value={item.value}>{item.label}</Radio>
      ))}
    </Radio.Group>
  );
}
