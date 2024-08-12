import React, { Fragment, useState, useEffect } from "react";
import { OverturnAttachments, OverturnForm } from "@components/Forms";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

const Overturn = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [overturnData, setOverturnData] = useState(null);
  useEffect(() => {
    const getOverturnData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getOverturn}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status >= 200 && response?.status < 300) {
          setOverturnData(response?.data?.data);
        }
      } catch (error) {
        if (error?.response) {
          console.error(
            error?.response?.data?.error || error?.response?.data?.message
          );
        }
      } finally {
        setLoading(false);
      }
    };
    getOverturnData();
  }, []);

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <h1 className="font-poppins font-medium text-xl text-black mb-4 text-center md:text-left">
        Overturn Page
      </h1>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className="text-black text-xl font-medium mb-4 font-poppins">
          Adjust Meeting
        </h2>
        <OverturnForm id={id} data={overturnData} />
        <OverturnAttachments id={id} data={overturnData} />
      </div>
    </Fragment>
  );
};

export default Overturn;
