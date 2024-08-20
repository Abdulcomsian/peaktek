import { clientBaseURL, clientEndPoints } from "./config";

export async function register(data) {
  const { name, email, password } = data;
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("name", name);
  formdata.append("password", password);

  try {
    const response = await clientBaseURL.post(
      clientEndPoints.register,
      formdata
    );
    return response.data;
  } catch (error) {
    if (error.response.data) {
      throw error.response.data; // This will contain server-provided error message
    } else if (error.request) {
      throw new Error("Network error occurred"); // Handle network error
    } else {
      throw new Error("Unknown error occurred"); // Handle unknown error
    }
  }
}

export async function login({ email, password }) {
  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  try {
    const resp = clientBaseURL.post(`${clientEndPoints.login}`, formdata);
    return resp;
  } catch (error) {
    return error;
  }
}
