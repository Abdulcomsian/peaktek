import { clientBaseURL, clientEndPoints, stagingURL } from "./config";

export async function createCustomerAggreement(agrementData, id) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints?.createAgreement}/${id}`,
      agrementData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return resp;
  } catch (error) {
    return error;
  }
}

export async function getCustomerAggreement(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.get(
      `${clientEndPoints?.getCustomerAgreement}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export async function signedCustomerAgreementByEmail(agreementId, pathname) {
  const token = localStorage.getItem("token");
  try {
    const response = await clientBaseURL.post(
      `${clientEndPoints?.signByEmail}/${agreementId}`,
      { url: `${stagingURL}${pathname}` },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response?.status >= 200 && response?.status < 300) {
      return resp.data;
    }
  } catch (error) {
    return error;
  }
}
