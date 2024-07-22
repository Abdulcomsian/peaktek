export async function getJobs() {
  const token = localStorage.getItem("token");
  console.log("FROM API CALL", token);
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
    "https://test7.accrualdev.com/api/get/jobs",
    requestOptions
  );
  // if (!resp.ok) throw new Error("Something went wrong.");
  const data = await resp.json();
  return data;
}

export async function createJob({ address, name, email, phone }) {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("address", address);
  formdata.append("latitude", "23.23");
  formdata.append("longitude", "12.12");
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("phone", phone);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const resp = await fetch(
    "https://test7.accrualdev.com/api/create-job",
    requestOptions
  );
  const data = await resp.json();
  return data;
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
