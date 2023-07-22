import axios from "axios";
import { config } from "./config";

export const getAllProducts = async () => {
  return await axios
    .get(`${config.databaseUrl}/api/articulos`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export const getProductById = async (id) => {
  return await axios
    .get(`${config.databaseUrl}/api/articulos/${id}`, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = async (id) => {
  return await axios
    .delete(`${config.databaseUrl}/api/articulos/delete/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export const insertProduct = async (body) => {
  return await axios
    .post(`${config.databaseUrl}/api/articulos/insert`, body)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

export const editProduct = async (body) => {
  return await axios
    .put(`${config.databaseUrl}/api/articulos/update`, body)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};
