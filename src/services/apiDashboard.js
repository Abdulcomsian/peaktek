import { clientBaseURL, clientEndPoints } from "./config";

export async function getDashboardStats() {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getDashboardStats}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
