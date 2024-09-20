import { clientBaseURL, clientEndPoints } from "./config";

export async function getCoc(jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.get(`${clientEndPoints.getCoc}/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    return error;
  }
}

export async function creatCOC(information, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createCoc}/${jobId}`,
      information,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    return error;
  }
}

export async function creatCOCInsuranceEmail(dataToLoad, jobId) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createCOCInsuranceEmail}/${jobId}`,
      dataToLoad,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error) {
    return error;
  }
}
