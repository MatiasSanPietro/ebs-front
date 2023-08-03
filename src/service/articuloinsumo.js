import axios from "axios";
import { config } from "./config";

export const getAllArticuloinsumos = async () => {
  return await axios
    .get(`${config.databaseUrl}/api/articuloinsumo`, {
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
