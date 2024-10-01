import React, { useState, useEffect } from "react";
import { CheckBox, Form } from "@components/FormControls";
import { CustomerInformation, ProjectSummaryForm } from "@components/Forms";
import SignatureForm from "../SignatureForm";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import COC from "../COC";
import Depreciation from "../Depreciation";
import OverheadProfit from "../OverheadProfit";
import Conclusion from "../Conclusion";
import { Button } from "@components/UI";
import { useFormik } from "formik";
import { clientBaseURL, clientEndPoints } from "@services/config";
import { cocSchema } from "@services/schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Loader } from "@components/UI";
import { useForm } from "react-hook-form";
import { creatCOC, getCoc } from "@services/apiCOC";
import { useAuth } from "@context/AuthContext";
import { HiArrowDownTray } from "react-icons/hi2";
import ClientInformation from "./ClientInformation";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@store/slices/activeTabSlice";

const baseURL = "https://accrualhub.com";

export default function COCForm({
  register,
  control,
  getValues,
  pdfUrl,
  handleSubmit,
  isSubmitting,
}) {
  const { id } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { name, email, phone } = useSelector(
    (state) => state?.jobs?.singleJobData
  );
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const dataToLoad = { ...data, name, email, phone };
    const resp = await creatCOC(dataToLoad, id);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.message);
      if (resp.data.status) {
        dispatch(setActiveTab("final-due-payments"));
        navigate(`/job-details/${id}/final-due-payments`);
      }
    }
  };

  const downloadButton = () => {
    const downloadPdf = async () => {
      try {
        // Fetch the PDF as a Blobconst
        const response = await axios.get(`${baseURL}${pdfUrl}`, {
          responseType: "blob",
        }); // Important: Tell axios to handle the response as a blob });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", `COC_${id}.pdf`); // Set the file name
        document.body.appendChild(link);
        link.click(); // Cleanup: Remove the link and revoke the object URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {}
    };
    downloadPdf();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2>COC form</h2>
        <Button
          type="button"
          onClick={downloadButton}
          className="!font-xs self-end text-sm"
          variant="gradient"
          disabled={!pdfUrl}
        >
          Download COC form
          <span>
            <HiArrowDownTray />
          </span>
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-50 rounded-3xl px-4 py-5"
      >
        <ClientInformation register={register} />
        <COC register={register} />
        <Depreciation register={register} />
        <OverheadProfit />
        <ProjectSummaryForm register={register} />
        <Conclusion register={register} />
        <SignatureForm register={register} control={control} />
        <div className="flex justify-end">
          <Button className="text-black mr-4 px-4 py-1">Cancel</Button>
          <Button type="submit" variant="gradient">
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <Loader width={"28px"} height={"28px"} color="#fff" />
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
