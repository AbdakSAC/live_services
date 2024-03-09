import axios from "axios";
import { API_URL } from "../configurations/general.js";

// Enviar data a api

export const sendDataSurebetLive = async (surebet) => {
  try {
    const { status } = await axios.post(`${API_URL}/lives`, {
      surebet_live: surebet,
    });

    if (status == 204) {
      console.log("Surebet guardada");
      return true;
    }
  } catch (error) {
    console.log(`SERVER_ERROR:: ${error.response.data.message}`);
    return false;
  }
};
