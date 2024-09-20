import { clientBaseURL, clientEndPoints } from "./config";

export async function updateWonAndCloseInfo(dataToLoad, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateWonAndClosedInfo}/${jobId}`,
      dataToLoad,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
export async function getWonAndCloseInfo(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getWonAndClosedInfo}/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
