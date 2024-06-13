import React, { useRef, useEffect, useState } from "react";
import "./tabComponent.css";
import { Link } from "react-router-dom";
import { Button, Form, Switch } from "antd";
import { IoPersonAddOutline } from "react-icons/io5";
import { Logo, Input } from "@components";
import { CustomerDetailModal } from "@components/Modals";
import { getCustomerName } from "@store/slices/customerSlice";
import { useSelector } from "react-redux";

import { AiOutlineMail } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { BiTask } from "react-icons/bi";

const TabComponent = ({ selectedTask }) => {
  const [tabTitle, setTabTitle] = useState([
    "Job details",
    "Customer Agreement",
    "Warranty Information",
    "Material Order",
    "Tasks",
    "Proposals",
    "Invoices",
    "Attachments",
  ]);
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showCustomerDetailModal, setShowCustomerDetailModal] = useState(false);

  const customer = useSelector((state) => state?.customer);
  console.log(customer);

  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];
    console.log("section", section);
    if (section) {
      setActiveTab(index);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = sectionRefs.current;
      let activeIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeIndex = i;
          break;
        }
      }

      setActiveTab(activeIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabsData = [
    {
      headerData: {
        title: "Job Detail",
      },
      component: <JobDetailFormComponent />,
    },
    {
      headerData: {
        title: "Customer Agreement",
        to: "/customer-agreement",
        children: "Create Agreement",
      },
    },
    {
      headerData: {
        title: "Warranty Information",
        to: "/warranty-information",
        children: "Create Warranty Information",
      },
    },
    {
      headerData: {
        title: "Material Order",
        to: "/material-order",
        children: "Create Material Order",
      },
    },
    {
      headerData: {
        title: "Commission Agreement",
        to: "/commission-agreement",
        children: "Create Commission Agreement",
      },
    },
    {
      headerData: {
        title: "Certificate of Completion",
        to: "/certificate-of-completion",
        children: "Create Certificate of Completion",
      },
    },
    {
      headerData: {
        title: "Comission",
        to: "/commission",
        children: "Create Comission",
      },
    },
    {
      headerData: {
        title: "Comission Contractor",
        to: "/commission-contractor",
        children: "Create Comission Contractor",
      },
    },
    {
      headerData: {
        title: "Contractor PaySheet",
        to: "/contractor-pay-sheet",
        children: "Create Paysheet",
      },
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-xl mb-3">{selectedTask}</h1>
        <div className="flex items-center gap-2 mb-1">
          <div className="days text-xs px-2">6 days</div>
          <div className="bg-gray-200 text-xs rounded-md flex items-center gap-2 p-1 px-2 text-gray-600">
            <BiTask />
            <p>Task 0/1</p>
          </div>
          <div className="flex items-center gap-2 p-1 text-xs px-2 border border-1 border-gray-200 rounded-md text-gray-500">
            <BiTask />
            <p>No reports</p>
          </div>
          <div className="flex items-center gap-2 p-1 text-xs px-2 border border-1 border-gray-200 rounded-md text-gray-500">
            <BiTask />
            <p>No Proposals</p>
          </div>
          <div className="flex items-center gap-2 p-1 text-xs px-2  text-gray-500">
            <p>Updated 4 days ago</p>
          </div>
          <div className="flex items-center gap-2 p-1 text-xs px-2 text-gray-500">
            <p>All changes saved</p>
          </div>
        </div>
        <div className="tabs-container">
          {tabTitle.map((title, index) => (
            <button
              key={index}
              className={`p-2 btn-tab  ${activeTab === index ? "active" : ""}`}
              onClick={() => scrollToSection(index)}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="flex justify-between flex-col  my-2 md:flex-row max-h-96 overflow-y-auto	">
          <div className=" overflow-y-scroll flex-shrink-0 basis-2/3">
            {tabsData.map((data, index) => {
              const { title, to, children } = data.headerData;
              return (
                <TabSection key={index} index={index} sectionRefs={sectionRefs}>
                  <SectionHeader title={title} to={to} children={children} />
                  {data.component ? data.component : null}
                </TabSection>
              );
            })}
          </div>
          <div className="w-full  pl-4">
            {customer.customerName.length > 0 ? (
              <Customer customer={customer} />
            ) : (
              <AddCustomer onShowModal={setShowCustomerDetailModal} />
            )}
            <div className="bg-gray-100 border rounded-lg p-3">
              <Switch defaultChecked className="mr-3" />
              <span className="text-gray-700 text-sm">Hide system updates</span>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3">
                    <Logo className="w-6 h-6" />
                    <div className="text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">
                          Job assignee updated
                        </p>
                        <time className="text-gray-500 text-md">
                          Today at 5:41 PM
                        </time>
                      </div>
                      <p className="text-xs">
                        Job assignee updated from none to PeakTek Pro by
                        PeakTech Pro.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3">
                    <Logo className="w-6 h-6" />
                    <div className="text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Job created</p>
                        <time className="text-gray-500 text-md">
                          Today at 5:41 PM
                        </time>
                      </div>
                      <p className="text-xs">
                        Job assignee updated from none to PeakTek Pro by
                        PeakTech Pro.PeakTek Pro by PeakTech Pro.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showCustomerDetailModal && (
        <CustomerDetailModal
          open={showCustomerDetailModal}
          onOk={() => setShowCustomerDetailModal((is) => !is)}
          onCancel={() => setShowCustomerDetailModal((is) => !is)}
        />
      )}
    </>
  );
};

export default TabComponent;

function TabSection({ children, index, sectionRefs }) {
  return (
    <section
      ref={(el) => (sectionRefs.current[index] = el)}
      className=" bg-gray-100 p-3 rounded-lg mb-2 mx-2"
    >
      {children}
    </section>
  );
}

function SectionHeader({ title, to, children }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base">{title}</h2>
      {to ? (
        <Link
          className="text-sm bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium  hover:bg-custom-gradient border border-transparent rounded-full px-3 py-2"
          to={to}
        >
          {children}
        </Link>
      ) : null}
    </div>
  );
}

function JobDetailFormComponent() {
  return (
    <Form
      layout="vertical"
      className="mb-4 grid grid-cols-3 items-center justify-center gap-3"
    >
      <Form.Item label="Assignee" name="assignee" className="mb-0">
        <Input placeholder="Enter Email" type="email" size="large" />
      </Form.Item>
      <Form.Item label="Workflow & stages" name="stages" className="mb-0">
        <Input placeholder="Enter Email" type="email" size="large" />
      </Form.Item>
      <Form.Item
        label="Source"
        name="source"
        className="mb-0"
        rules={[{ required: true, message: "Please enter your source" }]}
      >
        <Input
          placeholder="Source typing to add new"
          type="text"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Job value"
        name="jobValue"
        className="mb-0"
        rules={[{ required: true, message: "Please enter your job value" }]}
      >
        <Input type="text" size="large" />
      </Form.Item>
      <div className="rounded-md col-span-2 self-end	text-xs p-[0.75rem] border-1 border-blue-400 bg-blue-200">
        Job value will help you prioritize and report on your projects.
      </div>
      <Form.Item
        label="Details"
        name="jobValue"
        className="mb-0 col-start-1 col-span-3"
        rules={[{ required: true, message: "Please enter your job detail" }]}
      >
        <Input
          type="text"
          placeholder="Frequently referenced info (gate codes, meterial selection, parking, etc)"
          size="large"
        />
      </Form.Item>
    </Form>
  );
}

function AddCustomer({ onShowModal }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 mb-3 flex justify-between items-center">
      <h3 className="font-medium text-base">Job customer</h3>
      <Button className="rounded-full" onClick={() => onShowModal(true)}>
        <IoPersonAddOutline />
        Add Customer
      </Button>
    </div>
  );
}
function Customer({ customer }) {
  const { customerName: name, email, phone } = customer;
  return (
    <div className="border border-gray-200 rounded-lg p-3 mb-3 ">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-medium text-base">{name}</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs text-gray-600">Edit</button>
          <button className="text-xs text-gray-600">Replace</button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <p className="flex items-center gap-1 text-xs">
          <AiOutlineMail />
          {email}
        </p>
        <p className="flex items-center gap-1 text-xs">
          <LuMessagesSquare />
          {phone}
        </p>
      </div>
    </div>
  );
}
