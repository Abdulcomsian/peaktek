import { Button, Loader, Tabs } from "@components/UI";
import { FileIcon, GalleryIcon, TextIcon } from "@components/UI";
import TabsContentBox from "@components/UI/TabsContentBox";
import { useRef, useState } from "react";
import {
  AuthorizationForm,
  InspectionForm,
  IntroductionForm,
  PaymentScheduleForm,
  QuoteDetailsForm,
  RoofComponent,
  TermandConditionForm,
  TermsAndConditions,
  Title,
  TitleForm,
} from "@components/Forms";
import CarrierScope from "../CarrierScope";
import XactimateReport from "@components/Forms/XactimateReport";
import { generatePDFDesignMeeting } from "@services/apiDesignMeeting";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { baseURL } from "@services/config";

const tabsDesignMeeting = [
  { id: 1, title: "Carrier Scope" },
  { id: 2, title: "Title" },
  { id: 3, title: "Introduction" },
  { id: 4, title: "Inspection" },
  { id: 5, title: "Quote Detail" },
  { id: 6, title: "Authorization" },
  { id: 7, title: "Payment Schedule" },
  { id: 8, title: "Roof Component" },
  { id: 9, title: "Xactimate Report" },
  { id: 10, title: "Terms and Condition" },
];

function renderSection(currTab) {
  switch (currTab) {
    case 1:
      return <CarrierScope />;
    case 2:
      return <TitleForm />;
    case 3:
      return <IntroductionForm />;
    case 4:
      return <InspectionForm />;
    case 5:
      return <QuoteDetailsForm />;
    case 6:
      return <AuthorizationForm />;
    case 7:
      return <PaymentScheduleForm />;
    case 8:
      return <RoofComponent />;
    case 9:
      return <XactimateReport />;
    case 10:
      return <TermandConditionForm />;
  }
}

const DesignMeeting = () => {
  const { id: jobId } = useParams();
  const [currTab, setCurrTab] = useState(1);
  const [showViewPdfBtn, setShowViewPdfBtn] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfUrl = useRef(null);

  const handleGeneratePdf = async function () {
    setIsGeneratingPdf(true);
    try {
      const resp = await generatePDFDesignMeeting(jobId);
      if (resp.status >= 200 && resp.status < 300) {
        toast.success(resp.message);
        pdfUrl.current = resp.data.pdf_url;
        setShowViewPdfBtn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingPdf(false);
    }
    console.log(resp);
  };

  const openFileHandler = () => {
    const fullFileUrl = `${baseURL}${pdfUrl.current}`;
    window.open(fullFileUrl, "_blank");
    setShowViewPdfBtn(false);
  };
  return (
    // <TabsContentBox contentTitle="Design Meeting">
    <div>
      <div className="flex items-center justify-between">
        <h2>Design Meeting</h2>
        <div className="flex gap-3">
          <Button variant="gradient" onClick={handleGeneratePdf}>
            {isGeneratingPdf ? (
              <div className="flex justify-center items-center">
                <Loader width={"24px"} height={"24px"} color="#fff" />
              </div>
            ) : (
              "Generate PDF"
            )}
          </Button>
          {showViewPdfBtn && (
            <Button variant="gradient" onClick={openFileHandler}>
              view PDF
            </Button>
          )}
        </div>
      </div>
      <div className="hidden md:block p-4">
        <Tabs
          items={tabsDesignMeeting}
          activeTab={currTab}
          onClick={setCurrTab}
        />
        {renderSection(currTab)}
      </div>
      <div className="md:hidden">
        <Tabs
          items={tabsDesignMeeting}
          collapsable={true}
          onClick={setCurrTab}
          activeTab={currTab}
        />
      </div>
    </div>
    // </TabsContentBox>
  );
};

export default DesignMeeting;
