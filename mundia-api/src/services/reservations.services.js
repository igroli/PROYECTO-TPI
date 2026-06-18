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
    const id_users = req.usuario?.id_users;

    const filasBorradas = await Reservations.destroy({
      where: {
        id_reservations: id,
        id_users: id_users
      }
    });

    if(filasBorradas === 0) {
      return res.status(44).json({error: "Reserva no encontrada o no autorizada"})
    }

    res.json({ message: "Reserva eliminada correctamente", id_eliminado: id});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el servidor al eliminar la reserva"});
  }
};
