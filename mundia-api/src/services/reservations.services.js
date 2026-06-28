import { Properties } from "../models/Properties.js";
import { Reservations } from "../models/Reservations.js";

export const getReservations = async (req, res) => {
  try {
    const id_users = req.usuario?.id_users;
    console.log(req.usuario);
    if (!id_users) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const misReservas = await Reservations.findAll({
      where: { id_users: id_users },
      include: [
        {
          model: Properties
        },
      ],
    });

    res.json(misReservas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener reservas del usuario." });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { reservation_date, id_properties, id_users, id_agents } = req.body;

    const newReservation = await Reservations.create({
      reservation_date,
      state: "Pendiente de confirmación",
      id_properties,
      id_users,
      id_agents,
    });

    return res.status(201).json({
      message: "Reserva creada con éxito",
      data: newReservation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReservation = async(req, res) => {
  try {
    console.log("llegue a la ruta de borrado");
    const { id } = req.params;

    const filasBorradas = await Reservations.destroy({
      where: {
        id_reservations: id,
      }
    });

    if(filasBorradas === 0) {
      return res.status(404).json({error: "Reserva no encontrada o no autorizada"})
    }

    res.json({ message: "Reserva eliminada correctamente", id_eliminado: id});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor al eliminar la reserva"});
  }
};


export const getPendingReservations = async (req, res) => {
  const { id_agents, state } = req.query;
  console.log("id_agents recibido!", id_agents, typeof id_agents);

  const where = {};
  if (id_agents) where.id_agents = id_agents;
  if (state) where.state = state;

  try {
    const reservations = await Reservations.findAll({ where });
    console.log("reservations encontradas:", reservations.length);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservations.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reservation_date, state } = req.body;

    const [updated] = await Reservations.update(
      { reservation_date, state },
      { where: { id_reservations: id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json({ message: "Reserva actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};