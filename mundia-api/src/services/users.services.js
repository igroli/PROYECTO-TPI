import { Users } from "../models/Users.js";


// get users
export const getUsers = async(req, res) => {
    const users = await Users.findAll();
    res.json(users);
}

//get user logged in
export const getUserLogged = async(req, res) => {
    return res.json(req.usuario);
}