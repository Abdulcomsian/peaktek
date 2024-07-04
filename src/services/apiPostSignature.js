const token = localStorage.getItem("token");

export default async function createSignature({ id, image }) {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("sign_image", image);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const resp = await fetch(
    `http://127.0.0.1:8000/api/update/customer-agreement/${id}`,
    requestOptions
  );
  const data = await resp.json();
  return data;
}
