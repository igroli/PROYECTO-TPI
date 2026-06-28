import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createReservation, deleteReservation, getPendingReservations, getReservations, getAllReservations, updateReservation } from '../services/reservations.services.js';
import { checkRoles } from '../middlewares/checkRole.js';

const router = Router();

router.get('/reservations', verifyToken, getReservations);

router.post('/createreservation', createReservation);

router.delete('/reservations/:id', verifyToken, deleteReservation);

// solo agents pueden ver esto
router.get('/reservationsFiltered', verifyToken, checkRoles(['Agent', 'Admin']), getPendingReservations);

router.get("/reservations/all", verifyToken, checkRoles(['Agent', 'Admin']), getAllReservations);

router.put("/reservations/:id", verifyToken, checkRoles(['Agent', 'Admin']), updateReservation);

export default router;