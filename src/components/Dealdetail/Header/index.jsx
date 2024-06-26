import { Button } from "@components/UI";
import { Breadcrumb } from "antd";

export default function Header() {
  return (
    <div className="col-span-2 border-b py-3 px-3 ">
      <div className="flex items-center justify-between  ">
        <h2>Company Name</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="danger"
            className="rounded-md px-2 py-1 font-normal uppercase text-xs"
          >
            Won
          </Button>
          <Button
            variant="accent"
            className="rounded-md px-2 py-1 font-normal uppercase text-xs"
          >
            Lost
          </Button>
        </div>
      </div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Dashboard",
          },
          {
            title: "New Lead",
            href: "",
          },
        ]}
      />
    </div>
  );
}
