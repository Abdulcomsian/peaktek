import { clientBaseURL, clientEndPoints } from "./config";

export async function createCarrierScope(images, id) {
  // Id <- JobId
  const token = localStorage.getItem("token");
  const formData = new FormData();
  images.forEach((file) => {
    formData.append("images[]", file);
  });
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createCarrierscope}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}

export async function createTitle(dataToLoad, id) {
  const token = localStorage.getItem("token");
  const {
    first_name,
    last_name,
    address,
    city,
    company_name,
    date,
    postal_code,
    primary_image,
    report_type,
    secondary_image,
    state,
  } = dataToLoad;
  const formdata = new FormData();
  formdata.append("first_name", first_name);
  formdata.append("last_name", last_name);
  formdata.append("company_name", company_name);
  formdata.append("address", address);
  formdata.append("city", city);
  formdata.append("state", state);
  formdata.append("zip", postal_code);
  formdata.append("report_type", report_type);
  formdata.append("date", date);
  formdata.append("primary_image", primary_image);
  formdata.append("secondary_image", secondary_image);
  try {
    const resp = clientBaseURL.post(
      `${clientEndPoints.createTitle}/${id}`,
      formdata,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return resp;
  } catch (err) {
    return err;
  }
}

export async function getTitle(id) {
  const token = localStorage.getItem("token");
  try {
    const resp = clientBaseURL.get(`${clientEndPoints.getTitle}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
}

export async function createIntroduction(formdata, id) {
  const token = localStorage.getItem("token");
  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createIntroduction}/${id}`,
      formdata,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (err) {
    return err;
  }
}

export async function getIntroduction(id) {
  const token = localStorage.getItem("token");
  try {
    const resp = clientBaseURL.get(`${clientEndPoints.getIntroduction}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return resp;
  } catch (error) {
    return error;
  }
}

export async function getCarrierScope(id) {
  const token = localStorage.getItem("token");
  try {
    const resp = clientBaseURL.get(`${clientEndPoints.getCarrierscope}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {
    return err;
  }
}

export async function createInspections(dataToLoad, id) {
  const token = localStorage.getItem("token");
  // const formData = new FormData();

  // dataToLoad.forEach(data => formData.append("inspections", data))
  
  console.log("FINAL DATA TO LOAD", dataToLoad)

  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createInspection}/${id}`,
      dataToLoad,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resp;
  } catch (error) {
    if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}
