import axios from "axios";
import { API_URL } from "../configurations/general.js";

// Enviar data a api

export const sendDataSurebetLive = async (surebet) => {
  const data = JSON.stringify(surebet, null, 2);

  try {
    const { status } = await axios.post(`${API_URL.development}/lives`, data);

    if (status == 204) {
      console.log("Surebet guardada");
    }
  } catch (error) {
    return console.log(`SERVER_ERROR:: ${error}`);
  }
};
