import axios from "axios";
import { createAgreement } from "./apiCreateCustomer";

const baseURL = "https://test7.accrualdev.com";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  register: "/api/register",
  login: "/api/login",
  updateJobSummary: "/api/update/job-summary",
  updateJobContent: "/api/update/job-content",
  createAdjustorMeeting: "/api/create/adjustor-meeting",
  //Jobs End points
  createJob: "/api/create-job",
  getJobs: "/api/get/jobs",
  getSingleJob: "/api/get-single/job",
  updateJobSummary: "/api/update/job-summary",
  getJobSummary: "/api/get/job-summary",
  updateJobContent: "/api/update/job-content",
  getJobContent: "/api/get/job-content",
  //Create Agreement
  createAgreement: "/api/customer-agreement",
  //Overturn Meeting
  createOverturn: "/api/create/overturn-meeting",
  updateOverturn: "/api/update/overturn-meeting-media",
  //Ready to build
  createReadyToBuild: "/api/store/ready-to-build",
  //COC
  createCoc: "/api/store/coc",
  getCoc: "/api/get/coc",
};

export { clientBaseURL, clientEndPoints };
