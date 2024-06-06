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
          <section
            ref={(el) => (sectionRefs.current[0] = el)}
            className="tab-section flex items-center justify-between"
          >
            <h2>Customer Agreement</h2>
            <Link className="btn" to="/customer-agreement">
              Create Agreement
            </Link>
          </section>
          <section
            ref={(el) => (sectionRefs.current[1] = el)}
            className="tab-section flex justify-between items-center"
          >
            <h2>Warranty Information</h2>
            <Link className="btn" to="/warranty-information">
              Create Warranty Information
            </Link>
          </section>
          <section
            ref={(el) => (sectionRefs.current[2] = el)}
            className="tab-section flex items-center justify-between"
          >
            <h2>Material Order</h2>
            <Link className="btn" to="/material-order">
              Create Material Order
            </Link>
          </section>
          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            className="tab-section"
          >
            <h2>Job details</h2>
            <div className="grid grid-cols-3 items-center gap-2">
              <Form.Item
                label="Assignee"
                labelAlign="top"
                className="mb-0 flex-col"
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  size="large"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">Yiminghe</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Workflow & stages"
                labelAlign="top"
                className="mb-0"
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  size="large"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">Yiminghe</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Source" labelAlign="top" className="mb-0">
                <Input
                  style={{ width: "100%" }}
                  placeholder="Start typing to add new"
                />
              </Form.Item>
              <Form.Item label="Job value" labelAlign="top" className="mb-0">
                <Input
                  style={{ width: "100%" }}
                  placeholder="Start typing to add new"
                />
              </Form.Item>
              <div className="rounded-md bg-blue-200 border border-blue-400 flex gap-2 p-2">
                <GoLightBulb className="mr-3" />{" "}
                <p className="text-black text-xs">
                  Job value will help you prioritize and report on your project
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className=" w-full pt-4 pl-4">
          <div className="border border-gray-400 rounded-lg p-3 mb-3 flex justify-between items-center">
            <h3 className="font-medium text-base">Job customer</h3>
            <Button className="rounded-full">
              <IoPersonAddOutline />
              Add Customer
            </Button>
          </div>
          <div className="bg-gray-100 border rounded-lg p-3">
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
                      Pro.PeakTek Pro by PeakTech Pro.
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
