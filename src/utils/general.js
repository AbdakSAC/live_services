import cron from "node-cron";

export const resetPageAutomatic = (page) => {
  cron.schedule("0 */3 * * *", async () => {
    await page.reload({ waitUntil: "domcontentloaded" });
  });
};
