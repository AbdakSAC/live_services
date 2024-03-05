import fs from "fs/promises";
const filePath = "src/sample/live.json";

export const listLives = async (req, res) => {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");

    // Validar si jsonData es falsy o no es un JSON válido
    const lives = jsonData ? JSON.parse(jsonData) : [];

    return res.status(200).json(lives);
  } catch (error) {
    return res.status(500).json({
      message: `SERVER_ERROR:: ${error}`,
    });
  }
};
