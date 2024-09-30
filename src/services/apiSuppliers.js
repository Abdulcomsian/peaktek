import { clientBaseURL, clientEndPoints } from "./config";

export async function getSuppliers(id) {
  const token = localStorage.getItem("token");

  try {
    const response = await clientBaseURL.get(
      `${clientEndPoints.getSuppliers}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return error.response;
  }
}
