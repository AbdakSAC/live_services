export const getDataForScrap = async (page)=>{
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
        const percent_color = getComputedStyle(headerElement.querySelector(".percent")).backgroundColor
        const sportName = headerElement
          .querySelector(".sport-name")
          .innerText.trim();
        const period_game = headerElement.querySelector(
          ".arb-game-period > span"
        );
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
          header: {
            percent,
            percent_color,
            sportName,
            period: period_game ? period_game.innerText.trim() : null,
            time,
          },
          sections,
        });
      }
    });

    return data;
  });

  return datos
}