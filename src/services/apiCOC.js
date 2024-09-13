import { clientBaseURL, clientEndPoints } from "./config";

export async function getCOC(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(`${clientEndPoints.getCoc}/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    return error;
  }
}
