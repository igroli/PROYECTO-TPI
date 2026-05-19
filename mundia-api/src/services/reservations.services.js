import { Reservations } from "../models/Reservations.js";

export const getReservations = async(req, res) => {
    const reservations = await Reservations.findAll();
    res.json(reservations);
}