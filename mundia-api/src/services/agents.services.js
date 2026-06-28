import { Agents } from "../models/Agents.js";
import bcrypt from "bcrypt";
import { Users } from "../models/Users.js";
import { Roles } from "../models/Roles.js";

export const getAgents = async (req, res) => {
  try {
    const agents = await Users.findAll({
      attributes: ['id_users', 'name', 'last_name', 'email', 'image_url', 'phone_number'],
      include: [{
        model: Roles,
        as: 'rol',
        attributes: ['name'],
        where: { name: 'Agent' }
      }]
    });

    res.json(agents);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAgents = async (req, res) => {
  try {
    const { name, last_name, email, password, phone_number, image_url } = req.body;

    const rolAgente = await Roles.findOne({ where: { name: "Agent" } });
    if (!rolAgente) {
      return res.status(500).json({ error: "Rol Agent no existe en la base de datos." });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      image_url,
      id_roles: rolAgente.id_roles,
    });

    await Agents.create({
      activo: true,
      id_users: newUser.id_users,
    });

    res.status(201).json({ message: "Agente registrado con éxito!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
