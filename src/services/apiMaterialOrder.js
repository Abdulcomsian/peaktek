import { clientBaseURL, clientEndPoints } from "./config";

export async function createMaterialOrder(dataToLoad, id) {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify(dataToLoad);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const resp = await fetch(
    `https://test7.accrualdev.com/api/material-order/${id}`,
    requestOptions
  );

  const data = await resp.json();
  return data;
}

export async function checkMaterialOrderApi(id) {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const resp = await fetch(
    `https://test7.accrualdev.com/api/check/material-order/${id}`,
    requestOptions
  );
  const data = await resp.json();
  return data;
}

export async function getConfirmationEmailStatus(jobId) {
  const token = localStorage.getItem("token");
  try {
    const responce = await clientBaseURL.get(
      `${clientEndPoints.getConfirmationEmailStatus}/${jobId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (responce.status >= 200 && responce.status < 300) {
      return responce.data;
    }
  } catch (error) {
    return error;
  }
}

export async function createMaterialOrderConfirmationEmail(data, jobId) {
  const token = localStorage.getItem("token");
  try {
    const responce = await clientBaseURL.post(
      `${clientEndPoints.createMaterialOrderConfirmationEmail}/${jobId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (responce.status >= 200 && responce.status < 300) {
      return responce.data;
    }
  } catch (error) {
    return error;
  }
}

export async function getMaterialOrderConfirmationEmail(jobId) {
  const token = localStorage.getItem("token");
  try {
    const responce = await clientBaseURL.post(
      `${clientEndPoints.createMaterialOrderConfirmationEmail}/${jobId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (responce.status >= 200 && responce.status < 300) {
      return responce.data;
    }
  } catch (error) {
    return error;
  }
}
