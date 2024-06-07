import React, { useRef, useEffect, useState } from "react";
import "./tabComponent.css";
import CustomerAgreementPage from "../pages/CustomerAgreement";
import WarrantyInformationPage from "../pages/WarrantyInformation";
import MaterialOrderPage from "../pages/MaterialOrder";
import { Link } from "react-router-dom";
import { Button, Form, Select, Switch } from "antd";
import { IoPersonAddOutline } from "react-icons/io5";
import Logo from "../components/Logo";
import Input from "../components/Input";
import { GoLightBulb } from "react-icons/go";

const TabComponent = ({ selectedTask }) => {
  const [tabTitle, setTabTitle] = useState([
    "Customer Agreement",
    "Warranty Information",
    "Material Order",
    "Job details",
    "Tasks",
    "Proposals",
    "Invoices",
    "Attachments",
  ]);
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(0);

  const scrollToSection = (index) => {
    console.log(index);
    const section = sectionRefs.current[index];
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
  ];

  return (
    <div>
      {selectedTask}
      <div className="tabs-container">
        {tabTitle.map((title, index) => (
          <button
            className={`p-2 btn-tab  ${activeTab === index ? "active" : ""}`}
            onClick={() => scrollToSection(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="tab-pan-container flex-shrink-0 basis-2/3">
          {tabsData.map((data, index) => {
            const { title, to, children } = data.headerData;

            // const currentRef = (sectionRefs.current[index] = el
            return (
              <TabSection index={index}>
                <SectionHeader title={title} to={to} children={children} />
                {data.component ? data.component : null}
              </TabSection>
            );
          })}
        </div>
        <div className=" w-full pt-4 pl-4">
          <div className="border border-gray-400 rounded-lg p-3 mb-3 flex justify-between items-center">
            <h3 className="font-medium text-base">Job customer</h3>
            <Button className="rounded-full">
              <IoPersonAddOutline />
              Add Customer
            </Button>
          </div>
          <div className="bg-gray-100 border rounded-lg p-3 h-[35vh] overflow-auto scrollbar-hide">
            <Switch defaultChecked className="mr-3" />
            <span className="text-gray-700 text-sm">Hide system updates</span>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3">
                  <Logo className="w-6" />
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
                      Job assignee updated from none to PeakTek Pro by PeakTech
                      Pro.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="bg-gray-200 p-3 rounded-lg flex items-center gap-3">
                  <Logo className="w-6" />
                  <div className="text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Job created</p>
                      <time className="text-gray-500 text-md">
                        Today at 5:41 PM
                      </time>
                    </div>
                    <p className="text-xs">
                      Job assignee updated from none to PeakTek Pro by PeakTech
                      Pro.PeakTek Pro by PeakTech Pro.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;

function TabSection({ children, index }) {
  return (
    <section
      // ref={(el) => (sectionRefs.current[index] = el)}
      className=" bg-gray-100 p-3 rounded-lg"
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
