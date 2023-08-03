import axios from "axios";
import { config } from "./config";

export const Getarticuloinsumodetallebyarticuloinsumoid = async (
  articuloinsumoId
) => {
  try {
    const response = await axios.get(
      `${config.databaseUrl}/api/articuloinsumodetalle/${articuloinsumoId}`,
      {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
