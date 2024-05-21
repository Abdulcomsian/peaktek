import axios from "axios";

const API_URL = "http://example.com/api"; // Replace with your actual API URL

// Function to register a new user
export const registerUser = async (userData) => {
  return true;
  //   try {
  //     const response = await axios.post(`${API_URL}/register`, userData);
  //     return response.data; // Assuming your backend sends back user data upon successful registration
  //   } catch (error) {
  //     throw error.response.data; // Throw error response from server
  //   }
};
