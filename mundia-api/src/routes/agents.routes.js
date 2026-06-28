import { Router } from "express";
import { createAgents, getAgents, updateAgent, deleteAgent } from "../services/agents.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRoles } from "../middlewares/checkRole.js";

const router = Router();

// rutas de admin
router.get("/agents", getAgents);
router.post("/agents", verifyToken, checkRoles('Admin'), createAgents);
router.put("/agents/:id", verifyToken, checkRoles('Admin'), updateAgent);
router.delete("/agents/:id", verifyToken, checkRoles('Admin'), deleteAgent);
export default router;