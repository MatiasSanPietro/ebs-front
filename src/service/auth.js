import axios from "axios";
import { config } from "./config";

export const registerUser = async (userData) => {
  return await axios
    .post(`${config.databaseUrl}/auth/register`, userData)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = async (userData) => {
  return await axios
    .post(`${config.databaseUrl}/auth/login`, userData)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = async () => {
  return await axios
    .post(`${config.databaseUrl}/auth/logout`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
