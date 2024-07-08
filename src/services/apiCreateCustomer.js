export async function createAgreement(dataToLoad) {
  const token = localStorage.getItem("token");
  const {
    street,
    city,
    state,
    zip_code,
    claim_number,
    policy_number,
    insurance,
    company_signature,
    company_printed_name,
    company_date,
    customer_signature,
    customer_printed_name,
    customer_date,
  } = dataToLoad;

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("street", street);
  formdata.append("city", city);
  formdata.append("state", state);
  formdata.append("claim_number", claim_number);
  formdata.append("zip_code", zip_code);
  formdata.append("policy_number", policy_number);
  formdata.append("insurance", insurance);
  formdata.append("company_signature", company_signature);
  formdata.append("company_printed_name", company_printed_name);
  formdata.append(
    "company_date",
    new Date(company_date.$d).toLocaleDateString()
  );
  formdata.append("customer_signature", customer_signature);
  formdata.append("customer_printed_name", customer_printed_name);
  formdata.append(
    "customer_date",
    new Date(customer_date.$d).toLocaleDateString()
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const resp = await fetch(
    "https://test7.accrualdev.com/api/customer-agreement/1",
    requestOptions
  );

  const data = await resp.json();
  return data;
}

export async function getCustomerAgreement(id) {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const resp = await fetch(
    `https://test7.accrualdev.com/api/get/customer-agreement/${id}`,
    requestOptions
  );
  const data = await resp.json();
  return data;
}
