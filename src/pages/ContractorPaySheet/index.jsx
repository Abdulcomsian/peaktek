import { Container, Input } from "@components";
import {
  ComissionTotal,
  ContractInformationForm,
  PaySheetTable,
} from "@components/Forms";
import InputContainer from "@components/InputContainer";
import { Radio } from "antd";

function ContractPaySheet({ className }) {
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4 uppercase after:block after:mt-2 after:w-2/12 after:border after:border-blue-400">
        Contractor paysheet
      </h1>
      <div className={`w-full ${className}`}>
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="Name:"
            placeholder="John Doe"
            type="text"
            applyMarginBottom={true}
            className="md:mr-4  mb-4 md:mb-0"
          />
          <Input
            label="Email:"
            placeholder="john@gmail.com"
            type="email"
            applyMarginBottom={true}
            className="md:mr-4  mb-4 md:mb-0"
          />
          <Input
            label="Phone:"
            placeholder="923081177825"
            type="number"
            applyMarginBottom={true}
            className="  mb-4 md:mb-0"
          />
        </InputContainer>
        <InputContainer className="flex flex-col md:flex-row justify-between md:mb-4">
          <Input
            label="Street:"
            placeholder="west Bridge"
            type="text"
            applyMarginBottom={true}
            className="md:mr-4  mb-4 md:mb-0"
          />
          <Input
            label="City:"
            placeholder="New York"
            type="text"
            applyMarginBottom={true}
            className="md:mr-4  mb-4 md:mb-0"
          />
          <Input
            label="State:"
            placeholder="NY"
            type="text"
            applyMarginBottom={true}
            className="  mb-4 md:mb-0"
          />
          <Input
            label="Zip:"
            placeholder="NY"
            type="text"
            applyMarginBottom={true}
            className="mb-4 md:mb-0"
          />
        </InputContainer>
        <InputContainer className="flex flex-col md:flex-row items-end md:mb-4">
          <Input
            label="Company:"
            placeholder="west Bridge"
            type="text"
            applyMarginBottom={true}
            className="md:mr-4 md:max-w-[23rem]  mb-4 md:mb-0"
          />
          <div className="flex flex-col md:flex-row w-[42rem] items-center  md:mb-0">
            <label className="w-full  mb-2 md:mb-0">W9 on File:</label>
            <Radio.Group className="flex items-center">
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center  md:mb-0">
            <label className="w-full md:max-w-2/8 mb-2 md:mb-0 md:ml-2">
              Workers Comp Insurance on File:
            </label>
            <Radio.Group className="flex items-center">
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center  md:mb-0">
            <label className="w-full mb-2 md:mb-0 md:ml-2">
              Commercial Liability on Fle:
            </label>
            <Radio.Group className="flex items-center">
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
          </div>
        </InputContainer>
      </div>
      <PaySheetTable />
    </Container>
  );
}

export default ContractPaySheet;
