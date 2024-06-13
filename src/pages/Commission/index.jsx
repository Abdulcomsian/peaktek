import { Container, Input } from "@components";
import { ComissionTotal, ContractInformationForm } from "@components/Forms";
import InputContainer from "@components/InputContainer";

function Commission({ className }) {
  return (
    <Container className="my-6 mx-10 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-black text-xl font-semibold mb-4 uppercase after:block after:mt-2 after:w-3/12 after:border after:border-blue-400">
        Sales Associate information
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
        </InputContainer>
        <InputContainer className="flex flex-col md:flex-row items-end md:mb-4">
          <Input
            label="Street:"
            placeholder="west Bridge"
            type="text"
            applyMarginBottom={true}
            className="md:mr-4 md:max-w-[23rem]  mb-4 md:mb-0"
          />
          <div className="flex flex-col md:flex-row w-[42rem] items-center  md:mb-0">
            <label className="w-full  mb-2 md:mb-0">Job Total</label>
            <Input className="w-full md:max-w-[20rem] md:mr-2" size="large" />
          </div>
          <div className="flex flex-col md:flex-row w-full items-center  md:mb-0">
            <label className="w-full mb-2 md:mb-0 md:ml-2">
              - (Overhead @ 10% Total) =
            </label>
            <Input className="w-full " size="large" />
          </div>
        </InputContainer>

        <div className="flex flex-col mt-3 md:flex-row items-center border-t border-b border-blue-600 py-4 mb-4 md:mb-0">
          <label className="w-full md:max-w-48 mb-2 md:mb-0">
            Purchase Order #
          </label>
          <Input className="w-full md:max-w-[27rem]" size="large" />
        </div>
        <div className="grid grid-cols-3 items-center md:gap-x-12 gap-y-2">
          <div className="div"></div>
          <div className="py-6 text-center font-bold uppercase">
            Description
          </div>
          <div className="py-6 text-center font-bold uppercase">Cost</div>

          <div className="">Labor</div>
          <Input className="" size="large" />
          <Input className="" size="large" />
          <div>Labor</div>
          <Input className="" size="large" />
          <Input className="" size="large" />
          <div>Labor</div>
          <Input className="" size="large" />
          <Input className="" size="large" />
          <div>Material</div>
          <Input className="" size="large" />
          <Input className="" size="large" />
          <div>Material</div>
          <Input className="" size="large" />
          <Input className="" size="large" />
          <div>Material</div>
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
          <Input className="" size="large" />
        </div>
        <div className="flex flex-col border-t border-b border-blue-600 py-4 mb-4 md:mb-0 mt-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-end md:gap-3 md:mb-5">
            <label className=" mb-2 md:mb-0 uppercase text-sm font-semibold">
              Total Profit
            </label>
            <Input className="max-w-[20rem]" disable size="large" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center mb-3 gap-y-3 md:gap-x-2">
            <p className="text-sm basis-1/2 font-semibold">Commission Rep 1</p>
            <Input
              className=""
              size="large"
              placeholder="0%"
              label="Commission % Rate"
              labelClass="text-xs text-center mb-2"
            />
            <Input
              className=""
              size="large"
              placeholder="0%"
              label="Commission Total"
              labelClass="text-xs text-center mb-2"
            />
            <Input className="" size="large" placeholder="0%" label="" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center mb-3 gap-y-3 md:gap-x-2">
            <p className="text-sm font-semibold basis-1/2">Commission Rep 2</p>
            <Input
              className="w-full md:max-w-[27rem]"
              size="large"
              placeholder="0%"
            />
            <Input
              className="w-full md:max-w-[27rem]"
              size="large"
              placeholder="0%"
            />
            <Input
              className="w-full md:max-w-[27rem]"
              size="large"
              placeholder="0%"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center mb-3 gap-y-3 md:gap-x-2">
            <p className="text-sm font-semibold basis-1/2">Team Lead</p>
            <Input
              className="w-full md:max-w-[27rem]"
              size="large"
              placeholder="0%"
            />
            <Input
              className="w-full md:max-w-[27rem]"
              size="large"
              placeholder="0%"
            />
            <Input
              className="w-full md:max-w-[27rem]"
              size="large"
              placeholder="0%"
            />
          </div>
        </div>
        <div className="flex flex-col mt-4 md:flex-row md:items-center md:justify-end md:gap-3 md:mb-5">
          <label className=" mb-2 md:mb-0 uppercase text-sm font-semibold">
            Net to company
          </label>
          <Input className="max-w-[20rem]" disable size="large" />
        </div>
      </div>
    </Container>
  );
}

export default Commission;
