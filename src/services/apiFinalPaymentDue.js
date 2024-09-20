import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "./config";

export async function updateFinalPaymentStatus(dataToLoad, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateFinalPaymentStatus}/${jobId}`,
      dataToLoad,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getFinalPaymentStats(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getFinalPaymentStats}/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
