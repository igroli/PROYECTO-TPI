import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getReservations } from '../services/reservations.services.js';

const router = Router();

router.get('/reservations', verifyToken, getReservations);

export default router;