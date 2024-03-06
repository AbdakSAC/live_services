import puppeteer from "puppeteer";

export const openBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  });

  return browser;
  } catch (error) {
    console.log('Could not create a browser instance => : ', error);
  }
  
};
