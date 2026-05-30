import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { name, last_name, email, password, phone_number } = req.body;

    const user = await Users.findOne({
        where: {
            email
        }
    });

    if (user)
        return res.status(400).send({ message: "User existente" });

    //hasheo de las contraseñas 
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    
    const [clientRole] = await Roles.findOrCreate({
        where: { name: "Client" },
        defaults: {
            description: "Usuario cliente por defecto",
        },
    });

    const newUser = await Users.create({
        name,
        last_name,
        email,
        password: hashedPassword,
        phone_number,
        id_roles: clientRole.id_roles,
    });

    res.json(newUser.id);
}