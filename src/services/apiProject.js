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
