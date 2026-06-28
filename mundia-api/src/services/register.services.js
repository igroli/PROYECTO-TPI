import { Users } from "../models/Users.js";
import { Roles } from "../models/Roles.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { name, last_name, email, password, phone_number } = req.body;
    const regex = /^(?=.*\d).{8,}$/;
    const onlyNums = /^\d+$/
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;


    const cleanName = name?.trim();
    const cleanLastName = last_name?.trim();
    const cleanEmail = email?.trim();
    const cleanPhone = phone_number?.trim();


    const user = await Users.findOne({
        where: {
            email: cleanEmail
        }
    });

    const number = await Users.findOne({
        where: {
            phone_number: "+" + cleanPhone
        }
    });

    if (!cleanName || !cleanLastName || !nameRegex.test(cleanName) || !nameRegex.test(cleanLastName)) {
        return res.status(400).send({ message: "El nombre y el apellido deben contener solo letras (mínimo 2 caracteres)." });
    }
    if (user)
        return res.status(400).send({ message: "User existente" });


    if (password.length < 8)
        return res.status(400).send({ message: "La contraseña debe ser mayor a 7 caracteres" });

    if (!regex.test(password))
        return res.status(400).send({ message: "Debe contener al menoz un Numero o Digito Especial" });



    if (number)
        return res.status(400).send({ message: "Numero de telefono existente" });

    if (cleanPhone.length != 12)
        return res.status(400).send({ message: "Debe tener 12 digitos" });

    if (!onlyNums.test(cleanPhone))
        return res.status(400).send({ message: "Solo digitos del 0 al 9" });


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
        name: cleanName,
        last_name: cleanLastName,
        email: cleanEmail,
        password: hashedPassword,
        phone_number: "+" + cleanPhone,
        id_roles: clientRole.id_roles,
    })

    res.json(newUser.id);
}