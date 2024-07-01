import OnShowEditIcon from "@components/HOC/OnShowEdit";
import { Collapse } from "antd";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BiSolidFlagCheckered } from "react-icons/bi";
import { Button } from "@components/UI";
import { Input } from "@components/FormControls";

const { Panel } = Collapse;
export default function JobActivities() {
  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Panel
        header={<p className="text-base font-semibold">Summary</p>}
        key="1"
      >
        <div className="grid grid-cols-[10px_1fr_1fr] gap-2 mb-3">
          <div className="col-span-1"></div>
          <Value title="Job Total" />

          {/* <div className="col-span-2">
            <label htmlFor="" className="text-xs block">
            Job Total
            </label>
            <input type="number" name="" id="" className=" py-1" />
          </div> */}
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-2 mb-3">
          <input type="checkbox" className="self-end mb-2" />
          <Input label="First Payment" />
          <Input label="Check #" />
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-2 mb-3">
          <input type="checkbox" className="self-end mb-2" />
          <Input label="Deductable" />
          <Input label="Check #" />
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-2 mb-3">
          <input type="checkbox" className="self-end mb-2" />
          <Value title="Upgrades" />
          <Input label="Check #" />
        </div>
        <div className="flex items-center gap-1">
          <BiSolidFlagCheckered />
          <OnShowEditIcon className="flex items-center justify-between w-full px-3 text-red-500">
            {new Date().toLocaleDateString()}
          </OnShowEditIcon>
        </div>
        <TotalBalance />
      </Panel>
      <Panel
        header={<p className="text-base font-semibold">Customer Agreement</p>}
        key="2"
      >
        <Button
          variant="gradient"
          className="text-xs py-0.7"
          to="/customer-agreement"
        >
          Create Agrrement
        </Button>
      </Panel>
      <Panel
        header={<p className="text-base font-semibold">Adjustor Meeting</p>}
        key="3"
      >
        <p>Content of panel 3</p>
      </Panel>
    </Collapse>
  );
}

function Value({ title }) {
  return (
    <div>
      <label htmlFor="" className="text-xs font-semibold mb-1">
        {title}
      </label>
      <OnShowEditIcon className="flex items-center justify-between w-full px-3 bg-slate-100">
        100
      </OnShowEditIcon>
    </div>
  );
}

function TotalBalance() {
  return (
    <div className="flex items-center justify-end">
      <p className="font-semibold text-base">Balance:</p>
      <span>$1000</span>
    </div>
  );
}
