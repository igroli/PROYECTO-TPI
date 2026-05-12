import { Users } from "../models/Users.js";;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({
        where: {
            email
        }        
    });

    if (!user)
        return res.status(401).send({ message:"Usuario no existente "});

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
        return res.status(401).send({ message: "Email y/o contraseña incorrecta."});

    const secretKey = 'contraseñarandom';

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    return res.json(token);
}