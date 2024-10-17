import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "./config";

export async function createCompany(data) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createCompany}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.data.message);
      return resp;
    }
  } catch (err) {
    if (err.response.status === 422) {
      toast.error(err.response.data.message);
    }
    return err;
  }
}
export async function getCompanies(id) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(`${clientEndPoints.getCompanies}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
  } catch (err) {
    if (err.response.status === 422) {
      toast.error(err.response.data.message);
    }
    return err;
  }
}

export async function updateCompany(data, companyId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateCompany}/${companyId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      return resp;
    }
  } catch (err) {
    if (err.response.status === 422) {
      toast.error(err.response.data.message);
    }
    return err;
  }
}
