import { clientBaseURL, clientEndPoints } from "./config";

export async function getProjectIntroApi(id) {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  // const formdata = new FormData();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const resp = await fetch(
    `https://test7.accrualdev.com/api/get/project-design/introduction/${id}`,
    requestOptions
  );

  const data = await resp.json();
  return data;
}

export async function getProjectTitleApi(id) {
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
    `https://test7.accrualdev.com/api/get/project-design/title/${id}`,
    requestOptions
  );
  const data = await resp.json();
  return data;
}
export async function createProjectTitle(dataToLoad, id) {
  const token = localStorage.getItem("token");
  const {
    firstName,
    lastName,
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
  formdata.append("first_name", firstName);
  formdata.append("last_name", lastName);
  formdata.append("company_name", company_name);
  formdata.append("address", address);
  formdata.append("city", city);
  formdata.append("state", state);
  formdata.append("zip", postal_code);
  formdata.append("report_type", report_type);
  formdata.append("date", date);
  formdata.append("primary_image", primary_image);
  formdata.append("secondary_image", secondary_image);
  console.log("FORM DATA", formdata);

  try {
    const resp = await clientBaseURL.post(
      `${clientEndPoints.createTitleForm}/${id}`,
      formdata,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(resp);
  } catch (err) {
    if (err.request) return err.request;
  }

  // return resp?.data
}

// export async function createProjectTitle(dataToLoad, id) {
//   const token = localStorage.getItem("token");
//   const {
//     firstName,
//     lastName,
//     address,
//     city,
//     company_name,
//     date,
//     postal_code,
//     primary_image,
//     report_type,
//     secondary_image,
//     state,
//   } = dataToLoad;

//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", `Bearer ${token}`);

//   const formdata = new FormData();
//   formdata.append("first_name", firstName);
//   formdata.append("last_name", lastName);
//   formdata.append("company_name", company_name);
//   formdata.append("address", address);
//   formdata.append("city", city);
//   formdata.append("state", state);
//   formdata.append("zip", postal_code);
//   formdata.append("report_type", report_type);
//   formdata.append("date", date);
//   formdata.append("primary_image", primary_image);
//   formdata.append("secondary_image", secondary_image);
//   console.log("FORM DATA", formdata);

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: formdata,
//     redirect: "follow",
//   };

//   const resp = await fetch(
//     `https://test7.accrualdev.com/api/store/project-design/title/${id}`,
//     requestOptions
//   );
//   const data = await resp.json();
//   return data;
// }

export async function createIntroduction(intro, id) {
  console.log(intro);
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("introduction", intro);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const resp = await fetch(
    `https://test7.accrualdev.com/api/store/project-design/introduction/${id}`,
    requestOptions
  );
  const data = await resp.json();
  return data;
}
