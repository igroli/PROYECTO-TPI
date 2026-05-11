// tabla roles (USUARIO AGENTE SUPERADMIN)
// agregar var vendida var reservada agregar vr petfriendly true false
// hashear contraseñas
import { Properties } from "../models/Properties.js";
import { sequelize } from "../../db.js";

// obtener todas las propiedades
export const getProperties = async(req, res) => {
    const properties = await Properties.findAll();
    res.json(properties);
}

// obtener 6 propiedades al azar para el carrousel
export const getCarrouselProperties = async (req, res) => {
  try {
    const properties = await Properties.findAll({
      order: sequelize.random(),
      limit: 6,
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtener una propiedad
export const getProperty = async (req, res) => {
    const { id } = req.params;
    const property = await Properties.findByPk(id);

    if (!property) {
        return res.status(404).send({ message: "Propiedad no encontrada"});
    }
    res.json(property) 


}

// post propiedad
export const createProperty = async (req, res) => {
  try {
    const { title, description, type_property, type_transactions, price, square_mts, rooms, bathroom, address, image_url } = req.body;

    const newProperty = await Properties.create({
        title,
        description,
        type_property,
        type_transactions,
        price,
        square_mts,
        rooms,
        bathroom,
        address,
        image_url,
    });
    res.json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// crear usuario 2
// crear propiedad 1
// crear favoritos 4 
// crear reserva 3
// crear agente 5

// get propiedades 1
// get favoritos
// get agentes 2
// get algunas casas dependiendo de la busqueda3
// get las reservas del usuario

// actualizar propiedad
// actualizar usuario desde mi perfil 
// actualizar reserva desde el lado agente

// eliminar casa
// eliminar usuario ( solo super admin)
// elimiinar reservas ( del cliente o del agente )
// eliminar de favoritos
