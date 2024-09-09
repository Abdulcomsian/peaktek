import { clientBaseURL, clientEndPoints } from "./config";

export async function getJobs() {
  const token = localStorage.getItem("token");

  try {
    const resp = await clientBaseURL.get(`${clientEndPoints.getJobs}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
}

export async function createJob({ address, name, email, phone }) {
  const token = localStorage.getItem("token");

  const formdata = new FormData();
  formdata.append("address", address);
  formdata.append("latitude", "23.23");
  formdata.append("longitude", "12.12");
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("phone", phone);

  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createJob}`,
      formdata,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (error) {
    return error;
  }
}

export async function getJobApi(id) {
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
    `https://test7.accrualdev.com/api/get-single/job/${id}`,
    requestOptions
  );

  const data = await resp.json();
  return data;
}

export async function updateJobStatus(job, destinationColumn) {
  const { id } = job;
  const { id: status_id } = destinationColumn;
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.updateJobStatus}/${id}`,
      { status_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {}
}

export async function getJobswithCount() {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getJobswithCount}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (error) {
    return error;
  }
}

export async function getAllStatusJobs(statusId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getAllStatusJobs}/${statusId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data.data;
    }
  } catch (error) {
    return error;
  }
}

export async function getUserJobs(data) {
  const token = localStorage.getItem("token");

  try {
    const resp = clientBaseURL.post(
      `${clientEndPoints.getWeeklyOrMonlyJobs}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (error) {
    return error;
  }
}

export async function createSummaryInitialInformation(dataToLoad, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = clientBaseURL.post(
      `${clientEndPoints.createSummaryInitailInformation}/${jobId}`,
      dataToLoad,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
export async function getSummaryInitialInformation(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getSummaryInitialInformation}/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}

export async function createSummaryInsurance(dataToLoad, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createSummaryInsurance}/${jobId}`,
      dataToLoad,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}

export async function getSummaryInsurance(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(
      `${clientEndPoints.getSummaryInsurance}/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
