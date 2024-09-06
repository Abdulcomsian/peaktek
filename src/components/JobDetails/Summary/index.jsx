import React, { Fragment, useState, useEffect } from "react";
import Button from "@components/JobDetails/Button";
import MoneyInput from "./MoneyInput";
import SimpleInput from "./SimpleInput";
import { clientBaseURL, clientEndPoints } from "@services/config";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { Form } from "@components/FormControls";
import SelectBox from "./SelectBox";
import MediaContent from "./MediaContent";
import { DropDown, Loader } from "@components/UI";
import { useDispatch } from "react-redux";
import { fetchUsersData } from "@store/slices/usersSlice";
import { useSelector } from "react-redux";
const Summary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usersData = useSelector((state) => state?.users?.usersData);

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
    user_ids: [], // To store selected user IDs
  });

  useEffect(() => {
    const jobTotal = parseFloat(fields.job_total) || 0;
    const firstPayment = parseFloat(fields.first_payment) || 0;
    const deductable = parseFloat(fields.deductable) || 0;
    const upgrades = parseFloat(fields.upgrades) || 0;
    const finalPayment = parseFloat(fields.final_payment) || 0;
    let balance =
      jobTotal - firstPayment - deductable - upgrades - finalPayment;

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

  const handleSelectChange = (selectedValues) => {
    setFields((prevFields) => ({
      ...prevFields,
      user_ids: selectedValues, // Update the selected user IDs
    }));
  };

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

  useEffect(() => {
    if (id) {
      getSummaryFields();
    }
    dispatch(fetchUsersData());
  }, []);

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

  const userOptions = usersData.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      {/**First part start*/}
      <Form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl py-4 px-3 grid grid-cols-2 gap-3 max-w-screen-xl mb-4">
          <div className="bg-white p-2 rounded-2xl col-span-full">
            <SimpleInput
              id="job_total"
              placeholder="Address"
              className="px-4 py-3 rounded-2xl"
              labelClass="font-medium"
              type="number"
              name="job_total"
              max={8}
              required={true}
              value={fields.job_total}
              onChange={handleChange}
            />
          </div>
          <SimpleInput
            vertical={true}
            label="Invoice Number:"
            id="job_total"
            className="px-4 py-3 rounded-2xl w-full"
            labelClass="font-medium"
            placeholder="00-000-0000-00000"
            type="number"
            name="job_total"
            max={8}
            required={true}
            value={fields.job_total}
            onChange={handleChange}
          />

          <SelectBox
            vertical={true}
            label="Sales Representative"
            labelClass="font-medium"
            placeholder="Select Sales Representative"
            className="mb-4 md:mb-0 "
            selectClassName="px-4 py-3 rounded-2xl w-full"
            name="user_ids"
            size="small"
            options={userOptions}
            value={fields.user_ids}
            onChange={handleSelectChange}
          />
          <SimpleInput
            vertical={true}
            label="Market:"
            id="job_total"
            className="px-4 py-3 rounded-2xl w-full"
            labelClass="font-medium"
            placeholder="10000"
            type="number"
            name="job_total"
            max={8}
            required={true}
            value={fields.job_total}
            onChange={handleChange}
          />
          <DropDown
            vertical={true}
            labelClass="font-medium"
            className="font-normal px-4 py-3 rounded-2xl w-full"
            label="Load Source:"
            defaultText="Select source name here"
            items={[
              {
                label: "1st menu item",
                key: "0",
              },
              {
                label: "2nd menu item",
                key: "1",
              },
              {
                type: "divider",
              },
              {
                label: "3rd menu item",
                key: "3",
              },
            ]}
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl   mb-6 ">
          <div className="bg-white w-full rounded-2xl p-5 mb-4 lg:mb-0">
            <div className="flex flex-col lg:flex-row justify-start mb-4">
              <div className="flex justify-between  lg:flex-col  font-poppins font-normal text-sm  mb-4 lg:mb-0">
                <div className="text-black text-opacity-30 ">Job Total</div>
                <SimpleInput
                  id="job_total"
                  className="w-20 ps-2"
                  placeholder="10000"
                  type="number"
                  name="job_total"
                  max={8}
                  required={true}
                  value={fields.job_total}
                  onChange={handleChange}
                />
              </div>
              <div className="flex md:gap-4 px-0 lg:px-4 justify-between flex-wrap mb-4 lg:mb-0">
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
                      className="w-24"
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
                      className="w-24"
                      name="deductable_cheque_number"
                      value={fields.deductable_cheque_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col font-poppins font-normal text-sm box-border mb-4 md:mb-0">
                  <div className="text-black text-opacity-30 mb-4 ">
                    Upgrades
                  </div>
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
                      className="w-24"
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
                      className="w-24"
                      name="final_payment_cheque_number"
                      value={fields.final_payment_cheque_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center  lg:flex-col  font-poppins font-normal text-sm ">
                <div className="text-black  font-medium">Balance</div>

                <SimpleInput
                  id="balance"
                  className="w-20 ps-2"
                  placeholder="Total balance"
                  type="text"
                  name="balance"
                  value={fields.balance}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 px-3 grid grid-cols-2 gap-3 max-w-screen-xl mb-4">
          <h2 className="col-span-full uppercase text-base font-bold text-stone-500">
            insurance information
          </h2>
          <div className="bg-white p-2 rounded-2xl col-span-full">
            <SimpleInput
              id="job_total"
              placeholder="Address"
              className="px-4 py-3 rounded-2xl"
              labelClass="font-medium"
              type="number"
              name="job_total"
              max={8}
              required={true}
              value={fields.job_total}
              onChange={handleChange}
            />
          </div>
          <SimpleInput
            vertical={true}
            label="Invoice Number:"
            id="job_total"
            className="px-4 py-3 rounded-2xl w-full"
            labelClass="font-medium"
            placeholder="00-000-0000-00000"
            type="number"
            name="job_total"
            max={8}
            required={true}
            value={fields.job_total}
            onChange={handleChange}
          />

          <SelectBox
            vertical={true}
            label="Sales Representative"
            labelClass="font-medium"
            placeholder="Select Sales Representative"
            className="mb-4 md:mb-0 "
            selectClassName="px-4 py-3 rounded-2xl w-full"
            name="user_ids"
            size="small"
            options={userOptions}
            value={fields.user_ids}
            onChange={handleSelectChange}
          />
          <SimpleInput
            vertical={true}
            label="Market:"
            id="job_total"
            className="px-4 py-3 rounded-2xl w-full"
            labelClass="font-medium"
            placeholder="10000"
            type="number"
            name="job_total"
            max={8}
            required={true}
            value={fields.job_total}
            onChange={handleChange}
          />
          <DropDown
            vertical={true}
            labelClass="font-medium"
            className="font-normal px-4 py-3 rounded-2xl w-full"
            label="Load Source:"
            defaultText="Select source name here"
            items={[
              {
                label: "1st menu item",
                key: "0",
              },
              {
                label: "2nd menu item",
                key: "1",
              },
              {
                type: "divider",
              },
              {
                label: "3rd menu item",
                key: "3",
              },
            ]}
          />
        </div>
        <Button
          type="submit"
          className="w-full max-w-24 text-center text-white btn-gradient mb-4 px-4 py-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <Loader width={"24px"} height={"24px"} color="#fff" />
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
      <div className="bg-white rounded-2xl p-5 w-full max-w-7xl mb-6">
        <MediaContent id={id} />
      </div>
    </Fragment>
  );
};

export default Summary;
