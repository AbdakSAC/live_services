import express from "express";
import cors from "cors";
import { openBrowser } from "./scrapping/browser.js";
import { startLive } from "./scrapping/liveTab.js";
import { startPrematch } from "./scrapping/prematchTab.js";
import { PORT } from "./configurations/general.js";
import routes from "./routes/index.js";

const app = express();

//Configuracion
app.set("PORT", PORT);
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Iniciar Scrapping
const browser = openBrowser()

startLive(browser);
startPrematch(browser);

export default app;
