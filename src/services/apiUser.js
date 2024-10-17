import toast from "react-hot-toast";
import { clientBaseURL, clientEndPoints } from "./config";

export async function createUser(data) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createUser}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (err) {
    return err;
  }
}
export async function updateUser(data, userId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateUser}/${userId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (err) {
    return err;
  }
}

export async function getUser() {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(`${clientEndPoints.getCompanyusers}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status >= 200 && resp.status < 300) {
      //   toast.success(resp.data.message);
      return resp;
    }
  } catch (error) {
    return error;
  }
}
export async function getFilteredUsers(levelId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getFilterUser}?permission_level=${levelId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
  } catch (error) {
    return error;
  }
}
export async function getSearchedUsers(searchTerm) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getSearchedUser}?search_term=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
  } catch (error) {
    return error;
  }
}
