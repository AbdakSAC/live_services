import puppeteer from "puppeteer";

export const openBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  });

  return browser;
  } catch (error) {
    console.log('Could not create a browser instance => : ', error);
  }
  
};
