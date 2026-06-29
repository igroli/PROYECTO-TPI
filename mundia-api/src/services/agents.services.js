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
    const { name, last_name, email, password, phone_number, image_url } = req.body;

    // Expresiones regulares de validación (Mismo formato que el registro de usuarios)
    const regex = /^(?=.*\d).{8,}$/;
    const onlyNums = /^\d+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const cleanName = name?.trim();
    const cleanLastName = last_name?.trim();
    const cleanEmail = email?.trim();
    const cleanPhone = phone_number?.trim();

    if (!cleanName || !cleanLastName || !cleanEmail || !password || !cleanPhone) {
        return res.status(400).send({ message: "Por favor, complete todos los campos obligatorios." });
    }

    if (!nameRegex.test(cleanName) || !nameRegex.test(cleanLastName)) {
        return res.status(400).send({ message: "El nombre y el apellido deben contener solo letras (mínimo 2 caracteres)." });
    }

    if (!emailRegex.test(cleanEmail)) {
        return res.status(400).send({ message: "Por favor, ingrese un correo electrónico válido." });
    }

    if (cleanPhone.length !== 12) {
        return res.status(400).send({ message: "El número de teléfono debe tener 12 dígitos." });
    }

    if (!onlyNums.test(cleanPhone)) {
        return res.status(400).send({ message: "Teléfono: solo números del 0 al 9." });
    }

    if (password.length < 8) {
        return res.status(400).send({ message: "La contraseña debe tener al menos 8 caracteres." });
    }

    if (!regex.test(password)) {
        return res.status(400).send({ message: "La contraseña debe contener al menos un número." });
    }

    const emailUser = await Users.findOne({
        where: { email: cleanEmail }
    });

    if (emailUser) {
        return res.status(400).send({ message: "El correo electrónico ya está registrado." });
    }

    const phoneUser = await Users.findOne({
        where: { phone_number: "+" + cleanPhone }
    });

    if (phoneUser) {
        return res.status(400).send({ message: "El número de teléfono ya está registrado." });
    }

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
      name: cleanName,
      last_name: cleanLastName,
      email: cleanEmail,
      password: hashedPassword,
      phone_number: "+" + cleanPhone,
      image_url: image_url?.trim() || null,
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
