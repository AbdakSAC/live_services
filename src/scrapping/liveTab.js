import puppeteer from "puppeteer";
import { credentials } from "../configurations/credentials.js";

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
  let datos = await page.evaluate(() => {
    const arbsListElement = document.querySelector("ul.arbs-list");

    if (!arbsListElement) {
      console.error("No se encontró el elemento ul.arbs-list");
      return null;
    }

    const data = [];

    arbsListElement.querySelectorAll("li").forEach((arbItem) => {
      const headerElement = arbItem.querySelector(".header");
      const wrapperElement = arbItem.querySelector(".bet-wrapper");

      if (headerElement && wrapperElement) {
        const percent = headerElement
          .querySelector(".percent")
          .innerText.trim();
        const sportName = headerElement
          .querySelector(".sport-name")
          .innerText.trim();
        const time = headerElement
          .querySelector(".updated-at")
          .innerText.trim();

        const book_name = wrapperElement
          .querySelector(".bookmaker-name > span.text-ellipsis")
          .innerText.trim();
        const score = wrapperElement
          .querySelector(".bookmaker-name > .current-score")
          .innerText.trim();

        const event_name = wrapperElement
          .querySelector(".event-name > .name a")
          .innerText.trim();

        const league_name = wrapperElement
          .querySelector(".event-name > .league")
          .innerText.trim();

        const market = wrapperElement
          .querySelector(".market > span > span")
          .innerText.trim();

        const odds = wrapperElement
          .querySelector("span.coefficient")
          .innerText.trim();

        // Puedes agregar más propiedades según tus necesidades
        data.push({
          firts_column: { percent, sportName, time },
          second_column: {
            book_name,
            score,
            event_name,
            league_name,
            market,
            odds,
          },
        });
      }
    });

    return data;
  });

  console.log(datos);
};
