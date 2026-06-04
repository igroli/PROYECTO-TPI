import { Router } from "express";
import { createAgents, getAgents } from "../services/agents.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/agents", getAgents);
router.post("/agents", verifyToken,createAgents);

export default router;