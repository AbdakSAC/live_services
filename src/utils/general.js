import cron from "node-cron";

export const resetPageAtomatic = (page) => {
  cron.schedule("*/3 * * * *", async () => {
    await page.reload();
  });
};
