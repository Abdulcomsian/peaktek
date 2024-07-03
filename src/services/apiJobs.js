const token = localStorage.getItem("token");
export async function getJobs() {
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
  const data = await resp.json();
  return data;
}

export async function createJob({ address, name, email, phone }) {
  console.log(token, name, email, phone);
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
