import { Router } from 'express';
import { registerUser } from '../services/register.services.js';
import { loginUser } from '../services/login.services.js';
import { getUserLogged, getUsers, updateUser, deleteUser, updateUsersByAdmin } from '../services/users.services.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkRoles } from '../middlewares/checkRole.js';

const router = Router();

// rutas publicas
router.post("/register", registerUser);

router.post("/login", loginUser);

//rutas que necesitan token

router.get("/usersme", verifyToken, getUserLogged)
router.put("/users/profile", verifyToken, updateUser);

// rutas de admin
router.get("/users", verifyToken, checkRoles('Admin'), getUsers );

router.put("/users/editrol/:id", verifyToken, checkRoles('Admin'), updateUsersByAdmin);

router.delete("/users/delete", verifyToken, checkRoles('Admin'), deleteUser);

export default router;