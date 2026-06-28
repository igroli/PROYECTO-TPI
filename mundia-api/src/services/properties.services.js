import { Properties } from "../models/Properties.js";
import { sequelize } from "../../db.js";
import { Agents } from "../models/Agents.js";
import { Users } from "../models/Users.js";

// obtener todas las propiedades
export const getProperties = async(req, res) => {
    const properties = await Properties.findAll();
    include: [{
    model: Agents,
    include: [{ 
      model: Users, 
      attributes: ['name', 'last_name', 'image_url', 'phone_number']
    }]
  }]
    res.json(properties);
};

// obtener las propiedades y el usuario puede poner un filtro de si es alquiler o venta
export const getPropertiesFiltered = async (req, res) => {
  const { type_transactions, id_agents } = req.query;

  const where = {};

  if (type_transactions) {
    where.type_transactions = type_transactions;
  }

  if (id_agents) {
    where.id_agents = id_agents;
  }

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
    const { title, description, type_property, type_transactions, price, square_mts, rooms, bathroom, address, image_url, pet_friendly, state_property, id_agents } = req.body;

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
        state_property,
        id_agents
    });
    res.json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    console.log(req.body);
    const property = await Properties.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada." });
    }

    await property.update(req.body);

    return res.json({ message: "Propiedad actualizada correctamente.", property });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Properties.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada." });
    }

    await property.destroy();

    return res.json({ message: "Propiedad eliminada correctamente." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};