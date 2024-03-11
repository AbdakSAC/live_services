import cron from "node-cron";

export const resetPageAutomatic = (page) => {
  cron.schedule("*/30 * * * *", async () => {
    await page.reload({ waitUntil: "domcontentloaded" });
  });
};

// Tiempo de espera en solicitud
export const waitForRequest = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Esperar por respuesta
export const waitForResponse = async (page, url) => {
  try {
    const response = await page.waitForResponse(
      (response) => response.url().startsWith(url),
      { timeout: 0 }
    );
    return response;
  } catch (error) {
    console.error("Error waiting for response:", error.message);
    throw error;
  }
};
