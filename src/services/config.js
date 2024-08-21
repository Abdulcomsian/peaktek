import axios from "axios";
const stagingURL = "https://peaktek.vercel.app";
const baseURL = "https://test7.accrualdev.com";
// const baseURL =
//   "https://693b-2407-d000-d-98ea-50a8-882e-5618-9913.ngrok-free.app";

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
  updateJobStatus: "/api/update/job-status",
  //Job Summary End-Points
  updateJobSummary: "/api/update/job-summary",
  getJobSummary: "/api/get/job-summary",
  updateJobContent: "/api/update/job-content",
  updateJobContentFileName: "/api/change/job-content/file-name",
  getJobContent: "/api/get/job-content",
  deleteMediaFiles: "/api/delete/job-content/media",
  //Customer Agreement
  createAgreement: "/api/customer-agreement",
  getCustomerAgreement: "/api/check/customer-agreement",
  createSignature: "/api/update/customer-agreement",
  signByEmail: "/api/sign-by-email",

  //Create Carrierscope
  createCarrierscope: "/api/store/carrier-scope",
  getCarrierscope: "/api/get/carrier-scope",

  //Title form
  getTitle: "/api/get/project-design/title",
  createTitle: "/api/store/project-design/title",
  //Inspection form
  createInspection: "/api/store/project-design/inspection",
  getInspection: "/api/get/project-design/inspection",
  updateQcInspectionFilename: "api/change/qc-inspection/file-name",
  //Introduction form
  createIntroduction: "/api/store/project-design/introduction",
  getIntroduction: "/api/get/project-design/introduction",

  //Quote Detail Form
  createQuoteDetail: "/api/store/project-design/quote",
  // Authorization Form
  createAuthorization: "/api/store/project-design/authorization",
  // Roof Component
  createRoofComponent: "/api/store/xactimate-report",

  // Term and Condition
  createTermCondition: "LATER",

  ///Adjustor Meeting
  createAdjustorMeeting: "/api/create/adjustor-meeting",
  getAdjustorMeeting: "/api/get/adjustor-meeting",
  //Overturn Meeting
  createOverturn: "/api/create/overturn-meeting",
  getOverturn: "/api/get/overturn-meeting",
  updateOverturn: "/api/update/overturn-meeting-media",
  updateOverturnFilename: "/api/change/overturn-meeting/file-name",
  deleteOverturnFiles: "/api/delete/overturn-meeting/media",
  // Scheduling
  createMaterialOrder: "/api/material-order",
  updateMaterialOrder: "/api/update/material-order",
  getMaterialOrder: "/api/get/material-order",
  checkMaterialOrder: "/api/check/material-order",
  materialOrderEmail: "/api/material-order/email",
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

export { clientBaseURL, clientEndPoints, stagingURL, baseURL };
