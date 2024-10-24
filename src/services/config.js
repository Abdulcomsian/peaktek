import axios from "axios";
const stagingURL = "https://peaktek.vercel.app";
const baseURL = "https://accrualhub.com";
// const baseURL =
//   "https://693b-2407-d000-d-98ea-50a8-882e-5618-9913.ngrok-free.app";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  // Users
  createUser: "/api/createUser",
  updateUser: "/api/updateUser",
  getCompanyusers: "/api/getUser",
  getFilterUser: "/api/users/filter",
  getSearchedUser: "/api/users/search",

  // Company
  createCompany: "/api/create/company",
  getCompanies: "/api/getCompanies",
  updateCompany: "/api/update/company",
  // Authentications
  register: "/api/register",
  login: "/api/login",
  updateJobSummary: "/api/update/job-summary",
  updateJobContent: "/api/update/job-content",

  //Profile
  updateUserProfile: "/api/updateProfile",
  updatePassword: "/api/changePassword",
  // Dashboard
  getDashboardStats: "/api/dashboard-stats",

  // Suppliers
  getSuppliers: "/api/get/suppliers",

  // Buil Scheduled
  buildScheduledForm: "/api/update/build-detail",
  getBuildSchedule: "/api/get/build-detail",
  confirmationEmail: "/api/confirmation-email",
  moConfirmationEmail: "/api/material-order/confirmation-email",
  materialOrderForm: "/api/material-order",
  updateBuildConfirmStatus: "/api/update/build-detail-status",
  confirmEmailSentStatus: "/api/confirmation-email-status",
  updateMOConfirmationemailstatus:
    "/api/material-order/confirmation-email-status",
  //create user
  createUsers: "/api/create/user",
  getCompanyUsers: "/api/get/company-users",
  getCompanySuppliers: "/api/get/company-suppliers",
  getCompanySubContractors: "/api/get/company-sub-contractors",
  getCompanyAdjustors: "/api/get/company-adjustors",
  //Jobs End points
  createJob: "/api/create-job",
  getJobs: "/api/get/jobs",
  getSingleJob: "/api/get-single/job",
  updateJobStatus: "/api/update/job-status",
  getJobswithCount: "/api/get/task-with-jobs-count",
  getAllStatusJobs: "api/get/jobs-by-task",
  getWeeklyOrMonlyJobs: "/api/dashboard-stats/detail",
  //Job Summary End-Points
  updateJobSummary: "/api/update/job-summary",
  getJobSummary: "/api/get/job-summary",
  updateJobContent: "/api/update/job-content",
  updateJobContentFileName: "/api/change/job-content/file-name",
  getJobContent: "/api/get/job-content",
  deleteMediaFiles: "/api/delete/job-content/media",
  createSummaryInitailInformation:
    "/api/update/job-summary/initial-information",
  getSummaryInitialInformation: "/api/get/job-summary/initial-information",
  createSummaryInsurance: "/api/update/job-summary/insurance-information",
  getSummaryInsurance: "/api/get/job-summary/insurance-information",
  //Customer Agreement
  createAgreement: "/api/customer-agreement",
  getCustomerAgreement: "/api/check/customer-agreement",
  createSignature: "/api/update/customer-agreement",
  signByEmail: "/api/sign-by-email",
  updateCustomerAgreementStatus: "/api/customer-agreement-status",
  //Estimate prepared
  createEstimatePrepared: "/api/store/estimate-prepared",
  getEstimatePrepared: "/api/get/estimate-prepared",
  changeEstimatePreparedFilename: "/api/change/estimate-prepared/file-name",
  deleteEstimatePreparedMedia: "/api/delete/estimate-prepared/media",
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
  deleteInspection: "/api/delete/project-design/inspection",
  //Introduction form
  createIntroduction: "/api/store/project-design/introduction",
  getIntroduction: "/api/get/project-design/introduction",

  //Quote Detail Form
  createQuoteDetail: "/api/store/project-design/quote",
  getQuoteDetail: "/api/get/project-design/quote",
  deleteQuoteSection: "/api/delete/section",
  deleteQuoteItem: "/api/delete/item",
  // Authorization Form
  createAuthorization: "/api/store/project-design/authorization",
  getAuthorization: "/api/get/project-design/authorization",
  deleteAuthorizationSection: "/api/delete/authorization-section",
  deleteAuthorizationItem: "/api/delete/authorization-item",

  // Payment Form
  createPaymentSchedule: "/api/store/payment-schedule",
  getPaymentSchedule: "/api/get/payment-schedule",

  // Roof Component
  createRoofComponent: "/api/store/roof-component",
  getRoofComponent: "/api/get/roof-component",

  // Xactimate Report form,
  createXactimatereport: "/api/store/xactimate-report",
  getXactimatereport: "/api/get/xactimate-report",

  // Term and Condition
  createTermCondition: "/api/store/term-and-condition",
  getTermCondition: "/api/get/term-and-condition",

  //Desing Meeting
  generatePDFDesignMeeting: "/api/generate/design-meeting-pdf",

  ///Adjustor Meeting
  createAdjustorMeeting: "/api/create/adjustor-meeting",
  getAdjustorMeeting: "/api/get/adjustor-meeting",
  updateAdjustorMaeetingStatus: "/api/update-status/adjustor-meeting",
  updateAdjustorMeetingSentStatus: "/api/add/adjustor-meeting-status",
  updateApprovalStatus: "/api/update-status/adjustor-meeting",
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
  emailToSupplier: "/api/send/email",
  createMaterialOrderConfirmationEmail:
    "/api/material-order/confirmation-email",
  getMaterialOrderConfirmationEmailStatus:
    "/api/get-material-order/confirmation-email-status",
  getEmailSentStatus: "/api/get-material-order/confirmation-email-status",
  createMaterialConfirmationEmail: "/api/get/build-detail",
  //Ready to build
  createReadyToBuild: "/api/store/ready-to-build",
  getReadyToBuild: "/api/get/ready-to-build",
  updateConfirmStatus: "/api/store/ready-to-build-status",

  //QC Inspection
  storeQCInspection: "/api/store/qc-inspection",
  storeQCInspectionMedia: "/api/store/qc-inspection/media",
  getQCInspection: "/api/get/qc-inspection",
  // In Progress
  storeInProgress: "/api/update/in-progress",
  getInProgress: "/api/get/in-progress",
  updatestatusInProgress: "/api/update/in-progress-status",
  //COC
  createCoc: "/api/store/coc",
  getCoc: "/api/get/coc",
  createCOCInsuranceEmail: "/api/coc/insurance-email",
  updateCOCStatus: "/api/update/coc/status",
  // Final Payment due
  getFinalPaymentStats: "/api/get/final-payment-due",
  updateFinalPaymentStatus: "/api/update/final-payment-due",
  // Ready To Closed
  updateReadyToClose: "/api/update/ready-to-close",
  getReadyToCloseData: "/api/get/ready-to-close",
  updateStatusRTC: "/api/store/ready-to-build-status",
  updateStatusUpdateRTC: "/api/update/ready-to-close-status",
  // Won and closed
  updateWonAndClosedInfo: "/api/update/won-closed",
  getWonAndClosedInfo: "/api/get/won-closed",

  getConfirmationEmailStatus: "/api/get-confirmation-email-status",
};

export { clientBaseURL, clientEndPoints, stagingURL, baseURL };
