import { Reservations } from "../models/Reservations.js";

export const getReservations = async(req, res) => {
    const reservations = await Reservations.findAll();
    res.json(reservations);
}

export const createReservation = async(req, res) => {
    try {
        const { reservation_date, id_properties, id_users, id_agents } = req.body;

        const newReservation = await Reservations.create({
            reservation_date,
            state: "Pendiente de confirmación",
            id_properties,
            id_users,
            id_agents,
        })

        return res.status(201).json({
            message: "Reserva creada con éxito",
            data: newReservation
        })
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
}