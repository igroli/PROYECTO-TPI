import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Roles } from "../models/Roles.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email,
      },
      include: [{
        model: Roles,
        as: 'rol',
        attributes: ['name']
      }]
    });

    if (!user)
      return res.status(401).send({ message: "Usuario no existente " });

    const comparison = await bcrypt.compare(password, user.password);

    const rolName = user.rol?.name || 'Client';

    if (!comparison)
      return res
        .status(401)
        .send({ message: "Email y/o contraseña incorrecta." });

    const secretKey = "contraseñarandom";

    const token = jwt.sign(
      { email: user.email, id_users: user.id_users, name: user.name, rol: rolName },
      secretKey,
      { expiresIn: "1h" },
    );

    return res.json(token);
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
};
