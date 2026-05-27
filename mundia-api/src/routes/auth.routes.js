import { Router } from 'express';
import { registerUser } from '../services/register.services.js';
import { loginUser } from '../services/login.services.js';
import { getUserLogged, getUsers } from '../services/users.services.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// rutas publicas
router.post("/register", registerUser);

router.post("/login", loginUser);

//rutas que necesitan token
router.get("/users", verifyToken, getUsers);

router.get("/usersme", verifyToken, getUserLogged)
export default router;