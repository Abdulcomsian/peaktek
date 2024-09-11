import { clientBaseURL, clientEndPoints } from "./config";

export async function updateAdjustorMeetingStatus(status, id) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateAdjustorMaeetingStatus}/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data.data;
    }
  } catch (error) {
    return error;
  }
}
