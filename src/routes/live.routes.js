import { Router } from "express";
import { listLives } from "../controllers/live.controller.js";

const router = Router();

router.get("/", listLives); // Obtener todas las Lives

export default router;
