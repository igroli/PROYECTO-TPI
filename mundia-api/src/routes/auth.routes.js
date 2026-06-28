import { Router } from 'express';
import { registerUser } from '../services/register.services.js';
import { loginUser } from '../services/login.services.js';
import { getUserLogged, getUsers, updateUser, deleteUser } from '../services/users.services.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// rutas publicas
router.post("/register", registerUser);

router.post("/login", loginUser);

//rutas que necesitan token
router.get("/users", verifyToken, getUsers );

router.get("/usersme", verifyToken, getUserLogged)

// rutas de admin
router.put("/users/profile", verifyToken, updateUser);

router.delete("/users/delete", verifyToken, deleteUser);

export default router;