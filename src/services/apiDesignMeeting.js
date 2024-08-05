import { clientBaseURL, clientEndPoints } from "./config";

export async function createInspections(dataToLoad, id) {
  const token = localStorage.getItem("token");
  console.log("CONSOLE", dataToLoad);
  const formData = new FormData();
  formData.append("inspections", dataToLoad);

  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createInspection}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", resp);
  } catch (error) {
    if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}
