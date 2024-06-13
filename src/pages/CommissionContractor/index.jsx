import { Container } from "@components";
import {
  ContractInformationForm,
  DynamicForm,
  ComissionTotal,
} from "@components/Forms";
import { Input } from "antd";


const CommissionContractor = () => {
  const labels = [
    "Total",
    "Overhead",
    "Labor",
    "Labor",
    "Labor",
    "Material",
    "Material",
    "Material",
    "Material",
    "Material",
    "Material",
    "Material",
    "Material",
    "Material",
    "Material",
    "COGS Services",
    "COGS Services",
    "COGS Services",
    "COGS Services",
    "COGS Services",
    "Profit",
  ];
  const percentage = [
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
    "10.00%",
  ];
  const comissionLabel = ["Comission Rep 1", "Comission Rep 1", "Team Lead"];
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4 uppercase">
        CONTRACTOR INFORMATION
      </h1>
      <ContractInformationForm />
      <div className="flex flex-col md:flex-row items-center border-t-2 border-b-2 border-blue-600 py-4 mb-4 md:mb-0">
        <label className="w-full md:max-w-48 mb-2 md:mb-0">
          Purchase Order #
        </label>
        <Input className="w-full md:max-w-[27rem]" size="large" />
      </div>

      <DynamicForm labels={labels} percentage={percentage} />
      <ComissionTotal labels={comissionLabel} />
      <div className="flex flex-col md:flex-row items-center py-4 mb-4 md:mb-0">
        <label className="w-full md:max-w-48 mb-2 md:mb-0">Net</label>
        <Input className="w-full md:max-w-[27rem]" size="large" />
      </div>
    </Container>
  );
};

export default CommissionContractor;
