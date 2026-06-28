import { Agents } from "../models/Agents.js";
import bcrypt from "bcrypt";
import { Users } from "../models/Users.js";
import { Roles } from "../models/Roles.js";

export const getAgents = async (req, res) => {
  try {
    const agents = await Users.findAll({
      attributes: ['id_users', 'name', 'last_name', 'email', 'image_url', 'phone_number'],
      include: [
        {
          model: Roles,
          as: 'rol',
          attributes: ['name'],
          where: { name: 'Agent' }
        },
        {
          model: Agents,
          attributes: ['id_agents', 'activo'],
        }
      ]
    });

    const result = agents.map(a => a.toJSON());

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAgents = async (req, res) => {
  try {
    const { name, last_name, email, password, phone_number, image_url } =
      req.body;

    const rolAgente = await Roles.findOne({ where: { name: "Agent" } });
    if (!rolAgente) {
      return res
        .status(500)
        .json({ error: "Rol Agent no existe en la base de datos." });
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

export const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const agent = await Agents.findByPk(id);

    if (!agent) {
      return res.status(404).json({ message: "Agente no encontrado." });
    }

    await agent.update({ activo });

    return res.json({ message: "Agente actualizado correctamente.", agent });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await Agents.findByPk(id);

    if (!agent) {
      return res.status(404).json({ message: "Agente no encontrado." });
    }

    await Users.destroy({ where: { id_users: agent.id_users } });

    return res.json({ message: "Agente eliminado correctamente." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};