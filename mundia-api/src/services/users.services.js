import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";

// get users
export const getUsers = async(req, res) => {
    const users = await Users.findAll();
    console.log('los usuarios son', users)
    res.json(users);
}

//get user logged in
export const getUserLogged = async(req, res) => {
    return res.json(req.usuario);
}

// traer usuarios con rol
export const getUserId = async(req, res) => {
    const usersId = await Users.findAll(
        
    )
}



export const updateUser = async (req, res) => {
  try {
    const id_users = req.usuario.id_users; 
    const { name, last_name, phone_number, image_url, password } = req.body;

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (last_name) dataToUpdate.last_name = last_name;
    if (phone_number) dataToUpdate.phone_number = phone_number;
    if (image_url) dataToUpdate.image_url = image_url;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password = await bcrypt.hash(password, salt);
    }

    const [rowsUpdated] = await Users.update(dataToUpdate, {
      where: { id_users }
    });

    if (rowsUpdated === 0) {
      return res.status(400).json({ message: "No se realizaron cambios." });    
    }

    const updatedUser = await Users.findByPk(id_users, {
      attributes: { exclude: ["password"] }
    });

    return res.json({ message: "¡Perfil actualizado!", user: updatedUser });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};