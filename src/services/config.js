import axios from "axios";

const baseURL = "https://test7.accrualdev.com";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  register: "/api/register",
  login: "/api/login",
  updateJobSummary: "/api/update/job-summary",
  updateJobContent: "/api/update/job-content",
};

export { clientBaseURL, clientEndPoints };
