import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createReservation, getReservations } from '../services/reservations.services.js';

const router = Router();

router.get('/reservations', verifyToken, getReservations);

router.post('/createreservation', createReservation);

export default router;