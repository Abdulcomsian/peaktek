import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "./config";

export async function createReadyToBuild(formData, jobId) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints?.createReadyToBuild}/${jobId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.status >= 200 && response?.status < 300) {
      toast.success(response?.data?.message);
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getReadyToBuild(jobId) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.get(
      `${clientEndPoints?.getReadyToBuild}/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.status >= 200 && response?.status < 300) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

export async function updateReadyToBuildStatus(formData, jobId) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints?.updateConfirmStatus}/${jobId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.status >= 200 && response?.status < 300) {
      toast.success(response?.data?.message);
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
