import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createReservation, deleteReservation, getReservations } from '../services/reservations.services.js';

const router = Router();

router.get('/reservations', verifyToken, getReservations);

router.post('/createreservation', createReservation);

router.delete('/reservations/:id', verifyToken, deleteReservation);
export default router;