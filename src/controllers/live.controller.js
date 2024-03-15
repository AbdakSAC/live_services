import axios from "axios";
import { API_URL } from "../configurations/general.js";

// Enviar data a api

export const sendDataSurebetLive = async (surebet) => {
  const surebetJson = JSON.parse(surebet);
  const result = [];

  if (surebetJson.length != 0) {
    //Crear casas
    surebetJson.forEach((item) => {
      const { header, sections } = item;

      const goldenPalaceIndices = sections.reduce((acc, section, index) => {
        if (section.book_name === "Golden Palace") {
          acc.push(index);
        }
        return acc;
      }, []);

      const tonyBetIndices = sections.reduce((acc, section, index) => {
        if (section.book_name === "TonyBet") {
          acc.push(index);
        }
        return acc;
      }, []);

      if (goldenPalaceIndices.length > 0) {
        const newSections = [...sections];
        goldenPalaceIndices.forEach((index) => {
          newSections[index] = {
            ...newSections[index],
            book_name: "ApuestaTotal",
          };
          const updatedHeader = { ...header };
          if (index === 0) {
            updatedHeader.home1 = "ApuestaTotal";
          } else if (index === 1) {
            updatedHeader.home2 = "ApuestaTotal";
          }
          result.push({ header: updatedHeader, sections: newSections });

          const newSections2 = [...newSections];
          newSections2[index] = {
            ...newSections2[index],
            book_name: "Doradobet",
          };
          const updatedHeader2 = { ...header };
          if (index === 0) {
            updatedHeader2.home1 = "Doradobet";
          } else if (index === 1) {
            updatedHeader2.home2 = "Doradobet";
          }
          result.push({ header: updatedHeader2, sections: newSections2 });

          const newSections3 = [...newSections];
          newSections3[index] = {
            ...newSections3[index],
            book_name: "Ecuabet",
          };
          const updatedHeader3 = { ...header };
          if (index === 0) {
            updatedHeader3.home1 = "Ecuabet";
          } else if (index === 1) {
            updatedHeader3.home2 = "Ecuabet";
          }
          result.push({ header: updatedHeader3, sections: newSections3 });
        });
      }

      if (tonyBetIndices.length > 0) {
        tonyBetIndices.forEach((index) => {
          const newSections = [...sections];
          newSections[index] = { ...newSections[index], book_name: "Duelbits" };
          const updatedHeader = { ...header };
          if (index === 0) {
            updatedHeader.home1 = "Duelbits";
          } else if (index === 1) {
            updatedHeader.home2 = "Duelbits";
          }
          result.push({ header: updatedHeader, sections: newSections });
  
          const newSections2 = [...newSections];
          newSections2[index] = { ...newSections2[index], book_name: "20bet" };
          const updatedHeader2 = { ...header };
          if (index === 0) {
            updatedHeader2.home1 = "20bet";
          } else if (index === 1) {
            updatedHeader2.home2 = "20bet";
          }
          result.push({ header: updatedHeader2, sections: newSections2 });
        });
      }

      // Agregar el elemento original
      result.push(item);
    });
  }

  try {
    const { status } = await axios.post(`${API_URL}/lives/new`, {
      num_live: 1,
      surebet_live: result,
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
