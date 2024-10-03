import { clientBaseURL, clientEndPoints } from "./config";

export async function buildScheduled(data, id) {
  const token = localStorage.getItem("token");
  console.log("Data In Service=>", data);

  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints.buildScheduledForm}/${id}`,
      data,
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
    console.error("Error updating build status:", error);
    return error.response;
  }
}

export async function confirmationEmail(data, id) {
  const token = localStorage.getItem("token");
  console.log("URL:", `${clientEndPoints.confirmationEmail}/${id}`);

  console.log("Data in service=>", data);
  // Ensure `send_to` is an array

  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints.confirmationEmail}/${id}`,
      { data },
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
    console.error("Error in confirm email :", error);
    return error.response;
  }
}

export async function moConfirmationEmail(data, id) {
  const token = localStorage.getItem("token");
  console.log("Data in service=>", data);

  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints.confirmationEmail}/${id}`,
      data,
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
    console.error("Error in MO confirm email :", error);
    return error.response;
  }
}

export async function materialOrderForm(data, id) {
  const token = localStorage.getItem("token");

  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints.materialOrderForm}/${id}`,
      data,
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
    console.error("Error updating Material Order Form:", error);
    return error.response;
  }
}
