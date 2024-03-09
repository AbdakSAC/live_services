import express from "express";
import cors from "cors";
import { openBrowser } from "./scrapping/browser.js";
import { startLive } from "./scrapping/live.js";
import { PORT } from "./configurations/general.js";

const app = express();

//Configuracion
app.set("PORT", PORT);
app.use(cors());
app.use(express.json());

// Iniciar Scrapping
const browser = openBrowser()

startLive(browser);

export default app;
