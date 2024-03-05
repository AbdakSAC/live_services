import puppeteer from "puppeteer";

export const startPrematch = async (openBrowser) => {
  const browser = await openBrowser;
  const page = await browser.newPage();

  // Iniciar prematch
  await page.goto("https://www.betburger.com/arbs");
  setTimeout(async () => {
    await page.reload();
  }, 20000);
};
