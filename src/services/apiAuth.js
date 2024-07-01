import { clientBaseURL, clientEndPoints } from "./config";

export async function register(data) {
  const { name, email, password } = data;
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("name", name);
  formdata.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await clientBaseURL.post(
      clientEndPoints.register,
      formdata
    );
    return response.data;
  } catch (error) {
    console.log("errrror", error.response.data);
    if (error.response.data) {
      throw error.response.data; // This will contain server-provided error message
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      throw new Error("Network error occurred"); // Handle network error
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
      throw new Error("Unknown error occurred"); // Handle unknown error
    }
  }
}
