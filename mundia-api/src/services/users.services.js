import { Users } from "../models/Users.js";


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