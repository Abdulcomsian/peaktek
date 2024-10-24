import { Switch } from "antd";

export default function Header({
  onClick,
  wrapperClass,
  value,
  defaultChecked,
}) {
  console.log("Default checked", defaultChecked, value);
  return (
    <div className={`flex justify-between ${wrapperClass}`}>
      <div>
        <h2 className="font-semibold text-black text-base mb-2">
          Require customers to acknowledge this page
        </h2>
        <p className="text-gray-400 text-sm">
          They will be asked during the signing process
        </p>
      </div>
      <Switch
        className="ml-4"
        onChange={onClick}
        value={value}
        defaultValue={defaultChecked}
        // defaultChecked={false}
      />
    </div>
  );
}
