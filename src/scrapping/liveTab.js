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
      const wrapperElements = arbItem.querySelectorAll(".bet-wrapper");

      if (headerElement && wrapperElements.length > 0) {
        const percent = headerElement
          .querySelector(".percent")
          .innerText.trim();
        const sportName = headerElement
          .querySelector(".sport-name")
          .innerText.trim();
        const time = headerElement
          .querySelector(".updated-at")
          .innerText.trim();

        const sections = [];

        wrapperElements.forEach((wrapperElement, index) => {
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

          const arrowUpElement = wrapperElement.querySelector(
            ".odds-info .icomoon-arrow-up"
          );
          const arrowDownElement = wrapperElement.querySelector(
            ".odds-info .icomoon-arrow-down"
          );

          // Obtener el nombre de la clase
          const arrowClass = arrowUpElement
            ? "icomoon-arrow-up"
            : arrowDownElement
            ? "icomoon-arrow-down"
            : null;

          sections.push({
            book_name,
            score,
            event_name,
            league_name,
            market,
            arrowClass,
            odds,
          });
        });

        // Puedes agregar más propiedades según tus necesidades
        data.push({
          header: { percent, sportName, time },
          sections,
        });
      }
    });

    return data;
  });

  console.log(JSON.stringify(datos, null, 2));
};
