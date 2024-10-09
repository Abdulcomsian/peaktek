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

export async function createAdjustorMeeting(formData, jobId) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints?.createAdjustorMeeting}/${jobId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function getAdjustorMeeting(jobId) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.get(
      `${clientEndPoints?.getAdjustorMeeting}/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}
