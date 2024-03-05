import { credentials } from "../configurations/credentials.js";
import { getDataForScrap } from "../utils/getData.js";

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

  // Obtener datos
  let collection = await getDataForScrap(page)

  console.log(JSON.stringify(collection, null, 2));
};
