import puppeteer from "puppeteer-extra";
import stealhPlugin from "puppeteer-extra-plugin-stealth";

export const openBrowser = async () => {
  try {
    puppeteer.use(stealhPlugin());

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
      ],
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    });

    return browser;
  } catch (error) {
    console.log("Could not create a browser instance => : ", error);
  }
};
