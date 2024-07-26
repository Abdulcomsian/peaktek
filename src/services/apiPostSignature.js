const token = localStorage.getItem("token");

export default async function createSignature({ id, image }) {
  const myHeaders = new Headers();
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
    `https://test7.accrualdev.com/api/update/customer-agreement/${id}`,
    requestOptions
  );
  const data = await resp.json();
  return data;
}
