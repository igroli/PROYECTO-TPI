import { Router } from "express";
import { createAgents, getAgents } from "../services/agents.services.js";

const router = Router();

router.get("/agents", getAgents);
router.post("/agents", createAgents);

export default router;