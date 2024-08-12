import axios from "axios";
const stagingURL = "https://peaktek.vercel.app";
const baseURL = "https://test7.accrualdev.com";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  register: "/api/register",
  login: "/api/login",
  updateJobSummary: "/api/update/job-summary",
  updateJobContent: "/api/update/job-content",

  //Jobs End points
  createJob: "/api/create-job",
  getJobs: "/api/get/jobs",
  getSingleJob: "/api/get-single/job",
  //Job Summary End-Points
  updateJobSummary: "/api/update/job-summary",
  getJobSummary: "/api/get/job-summary",
  updateJobContent: "/api/update/job-content",
  getJobContent: "/api/get/job-content",
  //Customer Agreement
  createAgreement: "/api/customer-agreement",
  getCustomerAgreement: "/api/get/customer-agreement",
  createSignature: "/api/update/customer-agreement",
  getSignatureEmail: "/api/sign-by-email",

  //Create Carrierscope
  createCarrierscope: "/api/store/carrier-scope",
  getCarrierscope: "/api/get/carrier-scope",

  //Title form
  getTitle: "/api/get/project-design/title",
  createTitle: "/api/store/project-design/title",
  //Inspection form
  createInspection: "/api/store/project-design/inspection",
  //Introduction form
  createIntroduction: "/api/store/project-design/introduction",
  getIntroduction: "/api/get/project-design/introduction",
  ///Adjustor Meeting
  createAdjustorMeeting: "/api/create/adjustor-meeting",
  getAdjustorMeeting: "/api/get/adjustor-meeting",
  //Overturn Meeting
  createOverturn: "/api/create/overturn-meeting",
  getOverturn: "/api/get/overturn-meeting",
  updateOverturn: "/api/update/overturn-meeting-media",
  //Ready to build
  createReadyToBuild: "/api/store/ready-to-build",
  getReadyToBuild: "/api/get/ready-to-build",
  //QC Inspection
  storeQCInspection: "/api/store/qc-inspection",
  storeQCInspectionMedia: "/api/store/qc-inspection/media",
  getQCInspection: "/api/get/qc-inspection",
  //COC
  createCoc: "/api/store/coc",
  getCoc: "/api/get/coc",
};

export { clientBaseURL, clientEndPoints, stagingURL };
