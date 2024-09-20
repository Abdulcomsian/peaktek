import { clientBaseURL, clientEndPoints } from "./config";

export async function updateReadyToClose(dataToLoad, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = clientBaseURL.post(
      `${clientEndPoints.updateReadyToClose}/${jobId}`,
      dataToLoad,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
export async function getReadyToClose(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = clientBaseURL.get(
      `${clientEndPoints.getReadyToCloseData}/${jobId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
