const token = localStorage.getItem("token");

export async function createAgreement(dataToLoad) {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(dataToLoad),
    redirect: "follow",
  };

  const resp = await fetch(
    "https://test7.accrualdev.com/api/customer-agreement/1",
    requestOptions
  );

  const data = await resp.json();
  return data;
}
