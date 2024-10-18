import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "./config";

export async function updatePersonalInformation(data, userId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateUserProfile}/${userId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("API RESP", resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      return resp;
    }
  } catch (error) {
    return error;
  }
}
export async function updatePassword(data) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updatePassword}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("API RESP", resp);
    if (resp.status >= 200 && resp.status < 300) {
      toast.success(resp.data.message);
      return resp;
    }
  } catch (error) {
    return error;
  }
}
