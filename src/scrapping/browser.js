import puppeteer from "puppeteer";

export const openBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  });

  return browser;
};
