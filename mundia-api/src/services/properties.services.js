import { Properties } from "../models/Properties.js";
import { sequelize } from "../../db.js";
import { Agents } from "../models/Agents.js";
import { Users } from "../models/Users.js";

export const getProperties = async (req, res) => {
  try {
    const properties = await Properties.findAll({
      include: [{
        model: Agents,
        include: [{
          model: Users,
          attributes: ['name', 'last_name', 'image_url', 'phone_number']
        }]
      }]
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
};

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
  try {
    const { id } = req.params;
    const property = await Properties.findByPk(id);

    if (!property) {
        return res.status(404).send({ message: "Propiedad no encontrada"});
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { 
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
    } = req.body;

    const onlyNums = /^\d+$/;
    const positiveNumeric = /^\d+(\.\d+)?$/;

    const cleanTitle = title?.trim();
    const cleanDescription = description?.trim();
    const cleanTypeProperty = type_property?.trim();
    const cleanTypeTransactions = type_transactions?.trim();
    const cleanAddress = address?.trim();
    const cleanImageUrl = image_url?.trim();
    const cleanStateProperty = state_property?.trim() || "Sin Reservas";

    if (
      !cleanTitle || 
      !cleanDescription || 
      !cleanTypeProperty || 
      !cleanTypeTransactions || 
      !cleanAddress || 
      !cleanImageUrl || 
      price === undefined || 
      square_mts === undefined || 
      rooms === undefined || 
      bathroom === undefined || 
      id_agents === undefined
    ) {
      return res.status(400).json({ message: "Por favor, complete todos los campos obligatorios." });
    }

    const stringPrice = price.toString().trim();
    if (!positiveNumeric.test(stringPrice) || parseFloat(stringPrice) <= 0) {
      return res.status(400).json({ message: "El precio debe ser un número válido y mayor a 0." });
    }

    const stringSquareMts = square_mts.toString().trim();
    if (!onlyNums.test(stringSquareMts) || parseInt(stringSquareMts, 10) <= 0) {
      return res.status(400).json({ message: "Los metros cuadrados deben ser un número entero mayor a 0." });
    }

    const stringRooms = rooms.toString().trim();
    const stringBathroom = bathroom.toString().trim();
    if (!onlyNums.test(stringRooms) || !onlyNums.test(stringBathroom)) {
      return res.status(400).json({ message: "La cantidad de habitaciones y baños deben ser valores numéricos enteros." });
    }

    const stringIdAgents = id_agents.toString().trim();
    if (!onlyNums.test(stringIdAgents) || parseInt(stringIdAgents, 10) <= 0) {
      return res.status(400).json({ message: "El ID del agente debe ser un número entero válido." });
    }

    const agentExists = await Agents.findByPk(parseInt(stringIdAgents, 10));
    if (!agentExists) {
      return res.status(404).json({ message: "El agente encargado especificado no existe." });
    }

    const newProperty = await Properties.create({
        title: cleanTitle,
        description: cleanDescription,
        type_property: cleanTypeProperty,
        type_transactions: cleanTypeTransactions,
        price: parseFloat(stringPrice),
        square_mts: parseInt(stringSquareMts, 10),
        rooms: parseInt(stringRooms, 10),
        bathroom: parseInt(stringBathroom, 10),
        address: cleanAddress,
        image_url: cleanImageUrl,
        pet_friendly: !!pet_friendly,
        state_property: cleanStateProperty,
        id_agents: parseInt(stringIdAgents, 10)
    });

    res.status(201).json(newProperty);
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

    // Si se envía id_agents en la actualización, validamos que exista
    if (req.body.id_agents !== undefined) {
      const stringIdAgents = req.body.id_agents.toString().trim();
      const onlyNums = /^\d+$/;
      
      if (!onlyNums.test(stringIdAgents)) {
        return res.status(400).json({ message: "El ID del agente debe ser numérico." });
      }

      const agentExists = await Agents.findByPk(parseInt(stringIdAgents, 10));
      if (!agentExists) {
        return res.status(404).json({ message: "El agente asignado no existe." });
      }
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
