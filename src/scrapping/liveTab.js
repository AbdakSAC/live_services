import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { credentials } from "../configurations/credentials.js";
import { getDataForScrap } from "../utils/getData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const direction = path.join(__dirname, "..", "sample", "live.json"); // Ruta de salida

export const startLive = async (openBrowser) => {

  const browser = await openBrowser;
  const page = await browser.newPage();
  await page.goto("https://www.betburger.com/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  //Iniciar sesión
  await page.type("#betburger_user_email", credentials.email);
  await page.type("#betburger_user_password", credentials.password);
  await page.waitForSelector("#profileMainComponent");
  await page.goto("https://www.betburger.com/arbs/live");

  // Esperar a que el elemento ul.arbs-list esté presente en la página
  await page.waitForSelector("ul.arbs-list");

  const htpp = page.waitForResponse(
    (response) => {
      return response
        .url()
        .startsWith("https://rest-api-lv.betburger.com/api/v1/arbs/pro_search");
    },
    { timeout: 0 }
  );

  // setInterval(async ()=>{
  //   await page.reload();
  // }, 20000)

  // Obtener datos
  setInterval(async () => {
    let collection_live = await getDataForScrap(page);

    await fs.writeFile(direction, JSON.stringify(collection_live, null, 2));
  }, 1500);
};
