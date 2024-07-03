import { useState } from "react";
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
      throw new Error("Network error occurred"); // Handle network error
    } else {
      throw new Error("Unknown error occurred"); // Handle unknown error
    }
  }
}

export async function login({ email, password }) {
  console.log(email, password);
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  const resp = await fetch(
    "https://test7.accrualdev.com/api/login",
    requestOptions
  );

  const data = await resp.json();
  return data;
}
