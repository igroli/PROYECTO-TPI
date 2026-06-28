import { Router } from "express";
import { createAgents, getAgents } from "../services/agents.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRoles } from "../middlewares/checkRole.js";

const router = Router();

// rutas de admin
router.get("/agents", getAgents);
router.post("/agents", verifyToken, checkRoles, createAgents);

export default router;