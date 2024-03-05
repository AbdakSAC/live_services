import { Router } from "express";
import Live from "./live.routes.js";

const router = Router();

router.use("/lives", Live) // Rutas para live

export default router;