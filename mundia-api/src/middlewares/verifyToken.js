import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";

export const verifyToken = async (req, res, next) => {
  const header = req.header("Authorization") || "";

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No posee autorizacion requerida" });
  }

  try {
    const payload = jwt.verify(token, "contraseñarandom");

    const userLogged = await Users.findByPk(payload.id_users, {
      attributes: { exclude: ["password"] },
    });

    if (!userLogged) {
      return res.status(404).json({ message: "El usuario ya no existe."});
    }

    req.usuario = userLogged;

    next();
  } catch (error) {
    return res.status(403).json({ message: "No posee permisos correctos" });
  }
};
