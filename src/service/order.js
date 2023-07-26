import axios from "axios";
import { config } from "./config";

export const getAllPedidos = async () => {
  return await axios
    .get(`${config.databaseUrl}/api/pedidos`, {
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

export const getPedidoXID = async (id) => {
  return await axios
    .get(`${config.databaseUrl}/api/pedidos/${id}`, {
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

export const deletePedido = async (id) => {
  return await axios
    .delete(`${config.databaseUrl}/api/pedidos/delete/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export const insertPedido = async (body) => {
  return await axios
    .post(`${config.databaseUrl}/api/pedidos/insert`, body)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

export const updatePedido = async (body) => {
  return await axios
    .put(`${config.databaseUrl}/api/pedidos/update`, body)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

export const getLastPedidoByUserId = async (userId) => {
  try {
    const res = await axios.get(
      `${config.databaseUrl}/api/pedidos/user/${userId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
