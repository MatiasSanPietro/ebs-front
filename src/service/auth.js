import axios from "axios";
import { config } from "./config";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${config.databaseUrl}/auth/register`,
      userData
    );
    return response.data;
  } catch (err) {
    throw err; // Lanza el error nuevamente porque sino el register crasheaba
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${config.databaseUrl}/auth/login`,
      userData
    );
    return response.data;
  } catch (err) {
    throw err; // Lanza el error nuevamente porque sino el login crasheaba
  }
};

export const logoutUser = async () => {
  return await axios
    .post(`${config.databaseUrl}/auth/logout`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
