import { credentials } from "../configurations/credentials.js";
import { getDataForScrap } from "../utils/getData.js";
import {
  waitForRequest,
  waitForResponse,
  resetPageAutomatic,
} from "../utils/general.js";
import { sendDataSurebetLive } from "../controllers/live.controller.js";
import cron from "node-cron";

const request = "https://rest-api-lv.betburger.com/api/v1/arbs/pro_search";

const clearcache = async (page) => {
  const client = await page.target().createCDPSession();
  await client.send("Network.clearBrowserCache");
};

export const startLive = async (openBrowser) => {
  const browser = await openBrowser;
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );
  const userAgent = await browser.userAgent();
  await page.setUserAgent(userAgent.replace("Headless", ""));
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    window.navigator.chrome = { runtime: {} };
  });
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.betburger.com/users/sign_in", {
    waitUntil: "domcontentloaded",
  });

  //Iniciar sesión
  await page.type("#betburger_user_email", credentials.email);
  await page.type("#betburger_user_password", credentials.password);
  await page.waitForSelector("#profileMainComponent", { timeout: 0 });
  await page.goto("https://www.betburger.com/arbs/live");

  // Esperar a que el elemento ul.arbs-list esté presente en la página
  await page.waitForSelector("ul.arbs-list", { timeout: 0 });

  let reload = false;

  // Obtener datos
  setInterval(async () => {
    if (!reload) {
      let collection_live = await getDataForScrap(page);
      const surebet = JSON.stringify(collection_live, null, 2);

      if (surebet == "null") {
        let data = [];
        await sendDataSurebetLive(data);
      }

      if (surebet != "null") {
        await sendDataSurebetLive(surebet);
      }
    }

    await clearcache(page);
  }, 2000);

  cron.schedule("*/15 * * * *", async () => {
    reload = true;
    await page.reload({ waitUntil: "domcontentloaded" });
    reload = false;
  });
};
