import React, { Fragment, useState, useEffect } from "react";
import { CheckBox } from "@components/FormControls";
import { COCInsuranceForm } from "@components/Forms";
import { useParams, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import TabsContentBox from "@components/UI/TabsContentBox";
import { Loader, Tabs } from "@components/UI";
import COCForm from "./COCForm";
import { getCoc, updateCOCStatus } from "@services/apiCOC";
import InsuranceInfo from "./InsuranceInfo";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@store/slices/activeTabSlice";

const tabsDesignMeeting = [
  { id: 1, title: "COC FORM" },
  { id: 2, title: "COC INSURANCE EMAIL" },
];

const Complete = () => {
  const { id: jobId } = useParams(); // Get jobId from params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currTab, setCurrTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    defaultValues: async () => {
      const resp = await getCoc(jobId);
      console.log("get coc resp", resp);
      if (resp.status >= 200 && resp.status < 300) {
        setPdfUrl(resp.data.pdf_url); // Store PDF URL
        return resp.data;
      }
      if (resp.status === 401) {
        logout();
        navigate("/");
      }
    },
  });

  // Handle checkbox changes
  const handleCheckboxChange = async (e) => {
    const status = e.target.checked; // true if checked, false if unchecked
    try {
      setUpdatingStatus(true); // Show loader while the request is in progress
      const dataToLoad = { status }; // API body containing the status
      const resp = await updateCOCStatus(dataToLoad, jobId);
      console.log("update COC resp", resp);

      if (resp) {
        toast.success(
          `COC status updated to ${status ? "complete" : "incomplete"}`
        );
        if (resp.data.status) {
          dispatch(setActiveTab("final-due-payments"));
          navigate(`/job-details/${jobId}/final-due-payments`);
        }
      } else {
        toast.error("Failed to update COC status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating COC status.");
    } finally {
      setUpdatingStatus(false); // Hide loader after request completion
    }
  };

  return (
    <Fragment>
      {loading && <Spin fullscreen={true} />}
      <div className={`flex items-center gap-3`}>
        <CheckBox
          label="COC complete"
          id="status"
          name="status"
          disabled={updatingStatus}
          register={register}
          wrapperClassName="flex items-center justify-end gap-2 col-span-2"
          onChange={handleCheckboxChange} // Call API on checkbox change
        />
        {updatingStatus && <Loader width="24px" height="24px" color="#000" />}
      </div>
      <div className="bg-white p-5 rounded-2xl">
        <InsuranceInfo />
        <TabsContentBox>
          <div>
            <Tabs
              items={tabsDesignMeeting}
              activeTab={currTab}
              onClick={setCurrTab}
            />
            {currTab === 1 && (
              <COCForm
                register={register}
                control={control}
                getValues={getValues}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                pdfUrl={pdfUrl}
              />
            )}
            {currTab === 2 && <COCInsuranceForm />}
          </div>
        </TabsContentBox>
      </div>
    </Fragment>
  );
};

export default Complete;
