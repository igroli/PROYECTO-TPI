import { Properties } from "../models/Properties.js";
import { sequelize } from "../../db.js";

// obtener todas las propiedades
export const getProperties = async(req, res) => {
    const properties = await Properties.findAll();
    res.json(properties);
}

// obtener las propiedades y el usuario puede poner un filtro de si es alquiler o venta
export const getPropertiesFiltered = async (req, res) => {
  const { type_transactions } = req.query;

  const where = type_transactions ? { type_transactions } : {};
  console.log("Where: ", where);
  try {
    const propiedades = await Properties.findAll({ where });
    res.json(propiedades);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener propiedades" });
  }
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
    const { title, description, type_property, type_transactions, price, square_mts, rooms, bathroom, address, image_url, pet_friendly, state_property } = req.body;

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
        pet_friendly,
        state_property
    });
    res.json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// crear favoritos 4 
// crear reserva 3
// crear agente 5

// get favoritos
// get agentes 2
// get las reservas del usuario
