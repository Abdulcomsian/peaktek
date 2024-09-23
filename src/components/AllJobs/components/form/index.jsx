import { Button } from "@components/UI";
import React from "react";

const BuildConfirmation = () => {
  return (
    <div className="p-5 bg-gray-100 m-10 rounded-3xl ">
      {/* Header Tabs */}
      <div className="flex justify-between border-b-2 pb-2">
        {[
          "Ready to Build",
          "Build Scheduled",
          "In Progress",
          "Build Complete",
        ].map((tab, index) => (
          <div
            key={index}
            className={`px-4 py-2 ${
              tab === "Build Scheduled"
                ? "text-black border-b-4 border-gray-800 font-bold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Build Confirmation Status */}
      <div className="mt-4 flex items-center space-x-2">
        <h2 className="text-lg font-bold">
          BUILD CONFIRMED (Contractor/Homeowner):
        </h2>
        <span className="text-green-600 font-bold text-xl">✅</span>
      </div>

      {/* Build Details Grid */}
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow mt-4">
        <div className="flex">
          <p className="font-bold">Build Date:</p>
          <p className="ml-2">09/21/2024</p>
        </div>
        <div className="flex">
          <p className="font-bold">Build Time:</p>
          <p className="ml-2">9:00 am</p>
        </div>
        <div>
          <p className="font-bold">Homeowner:</p>
          <p>Alex Baldwin</p>
        </div>
        <div>
          <p className="font-bold">Homeowner Email:</p>
          <p>example@gmail.com</p>
        </div>
        <div>
          <p className="font-bold">Contractor:</p>
          <p>JL Construction LLC</p>
        </div>
        <div>
          <p className="font-bold">Contractor Email:</p>
          <p>example@gmail.com</p>
        </div>
        <div>
          <p className="font-bold">Supplier:</p>
          <p>Home Depot</p>
        </div>
        <div>
          <p className="font-bold">Supplier Email:</p>
          <p>example@gmail.com</p>
        </div>
      </div>

      {/* Tab Section */}
      <div className="flex space-x-4 mt-4">
        {[
          "Confirmation Email",
          "Material Order Form",
          "MO Confirmation Email",
        ].map((tab, index) => (
          <div
            key={index}
            className={`px-4 py-2 border-b-2 ${
              tab === "Confirmation Email"
                ? "border-gray-800 text-black"
                : "border-transparent text-gray-500"
            } cursor-pointer`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Email Section */}
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p>
              <span className="font-bold">Send To: </span>Homeowner@email.com;
              Contractor@email.com
            </p>
            <p>
              <span className="font-bold">Subject: </span>PeakTek - Build
              Confirmation
            </p>
          </div>
          <span className="font-bold">
            Email Sent: <span className="ml-4">✅</span>{" "}
          </span>
        </div>

        <div className="border p-4 rounded-lg">
          <p className="mb-4">
            <span className="font-bold">Email Body:</span>
          </p>
          <p className="italic">
            Hi (Homeowner Name),
            <br />
            <br />
            Hope you are doing well! Just wanted to take a moment to confirm
            that we’ve got everything lined up for your roofing projects. Our
            team is set to arrive on{" "}
            <span className="font-bold text-blue-600">
              Monday, 9/16 at 9:00am CST
            </span>
            . We’re excited to get started on making sure your home is protected
            with a top-notch roof!
            <br />
            <br />
            Feel free to reach out if you have any questions before then.
            <br />
            <br />
            Best,
            <br />
            PeakTek Team
          </p>
        </div>

        {/* Send Button */}
        <div className="mt-4">
          <Button variant={"gradient"} className={"rounded-3xl "}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildConfirmation;
