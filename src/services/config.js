import axios from "axios";

const baseURL = "https://test7.accrualdev.com";

const clientBaseURL = axios.create({
  baseURL,
});

const clientEndPoints = {
  register: "/api/register",
  login: "/api/login",
};

export { clientBaseURL, clientEndPoints };