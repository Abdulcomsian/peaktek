import React, { Fragment, useState, useEffect } from "react";
import Button from "@components/JobDetails/Button";
import MoneyInput from "./MoneyInput";
import SimpleInput from "./SimpleInput";
import { clientBaseURL, clientEndPoints } from "@services/config";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { Form } from "@components/FormControls";
import MediaContent from "./MediaContent";
import { Loader } from "@components/UI";
const Summary = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState({
    job_total: "",
    first_payment: "",
    first_payment_cheque_number: "",
    deductable: "",
    deductable_cheque_number: "",
    upgrades: "",
    upgrades_cheque_number: "",
    final_payment: "",
    final_payment_cheque_number: "",
    balance: "",
  });

  useEffect(() => {
    const jobTotal = parseFloat(fields.job_total) || 0;
    const firstPayment = parseFloat(fields.first_payment) || 0;
    const deductable = parseFloat(fields.deductable) || 0;
    const upgrades = parseFloat(fields.upgrades) || 0;
    const finalPayment = parseFloat(fields.final_payment) || 0;
    let balance =
      jobTotal - firstPayment - deductable - upgrades - finalPayment;

    if (balance < 0) {
      balance = 0;
    }
    setFields((prevFields) => ({
      ...prevFields,
      balance: balance.toFixed(2),
    }));
  }, [
    fields.job_total,
    fields.first_payment,
    fields.deductable,
    fields.upgrades,
    fields.final_payment,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getSummaryFields = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        setLoading(true);
        const response = await clientBaseURL.get(
          `${clientEndPoints?.getJobSummary}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status >= 200 && response?.status < 300) {
          // toast.success(response?.data?.message);
          setFields((prevFields) => ({
            ...prevFields,
            ...response.data.job, // Set fields with data from the response
          }));
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
    if (id) {
      getSummaryFields();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem("token");
      e.preventDefault();
      setIsSubmitting(true);
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await clientBaseURL.post(
        `${clientEndPoints?.updateJobSummary}/${id}`,
        fields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status >= 200 && response?.status < 300) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error?.response) {
        toast.error(
          error?.response?.data?.error || error?.response?.data?.message
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      {/**First part start*/}
      <div className="bg-white rounded-2xl p-5 w-full max-w-4xl mb-6">
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex justify-between  lg:flex-col  font-poppins font-normal text-sm  mb-4 lg:mb-0">
              <div className="text-black text-opacity-30 ">Job Total</div>
              <SimpleInput
                id="job_total"
                className="w-20 ps-2"
                placeholder="10000"
                type="number"
                name="job_total"
                required={true}
                value={fields.job_total}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-6 justify-between flex-wrap mb-4 lg:mb-0">
              <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
                <div className="text-black text-opacity-30  mb-4 ">
                  First Payment
                </div>
                <div className="flex">
                  <SimpleInput
                    id="first_payment"
                    className="w-16 ps-1 mr-1"
                    placeholder="2560"
                    type="number"
                    name="first_payment"
                    value={fields.first_payment}
                    onChange={handleChange}
                  />
                  <MoneyInput
                    id="first_payment_cheque_number"
                    placeholder="123FP"
                    type="text"
                    name="first_payment_cheque_number"
                    value={fields.first_payment_cheque_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
                <div className="text-black text-opacity-30 mb-4">
                  Deductable
                </div>
                <div className="flex">
                  <SimpleInput
                    id="deductable"
                    className="w-16 ps-1 mr-1"
                    placeholder="2560"
                    type="number"
                    name="deductable"
                    value={fields.deductable}
                    onChange={handleChange}
                  />
                  <MoneyInput
                    id="deductable_cheque_number"
                    placeholder="123FP"
                    type="text"
                    name="deductable_cheque_number"
                    value={fields.deductable_cheque_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
                <div className="text-black text-opacity-30 mb-4 ">Upgrades</div>
                <div className="flex">
                  <SimpleInput
                    id="upgrades"
                    className="w-16 ps-1 mr-1"
                    placeholder="2560"
                    type="number"
                    name="upgrades"
                    value={fields.upgrades}
                    onChange={handleChange}
                  />
                  <MoneyInput
                    id="upgrades_cheque_number"
                    placeholder="123FP"
                    type="text"
                    name="upgrades_cheque_number"
                    value={fields.upgrades_cheque_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
                <div className="text-black text-opacity-30 mb-4">
                  Final Payment
                </div>
                <div className="flex">
                  <SimpleInput
                    id="final_payment"
                    className="w-16 ps-1 mr-1"
                    placeholder="2560"
                    type="number"
                    name="final_payment"
                    value={fields.final_payment}
                    onChange={handleChange}
                  />
                  <MoneyInput
                    id="final_payment_cheque_number"
                    placeholder="123FP"
                    type="text"
                    name="final_payment_cheque_number"
                    value={fields.final_payment_cheque_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between lg:flex-col  font-poppins font-normal text-sm">
              <div className="text-black  font-medium">Balance</div>
              <div className="text-black">{fields.balance}</div>
            </div>
          </div>
          <Button
            type="submit"
            className="text-white btn-gradient px-4 py-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"28px"} height={"28px"} color="#fff" />
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </Form>
      </div>
      <div className="bg-white rounded-2xl p-5 w-full max-w-7xl mb-6">
        <MediaContent id={id} />
      </div>
    </Fragment>
  );
};

export default Summary;
