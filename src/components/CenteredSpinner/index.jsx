import { Spin } from "antd";

export default function CenteredSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <Spin />
    </div>
  );
}
