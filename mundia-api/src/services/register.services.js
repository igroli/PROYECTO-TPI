import { Users } from "../models/Users.js";
import { Roles } from "../models/Roles.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { name, last_name, email, password, phone_number } = req.body;

    // Expresiones regulares de validación
    const regex = /^(?=.*\d).{8,}$/;
    const onlyNums = /^\d+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    // NUEVO: Expresión regular para validar el formato del email en el backend
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Limpieza de strings segura usando Optional Chaining
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


    try {
        const user = await Users.findOne({
            where: { email: cleanEmail }
        });

        if (user) {
            return res.status(400).send({ message: "El correo electrónico ya está registrado." });
        }

        const number = await Users.findOne({
            where: { phone_number: "+" + cleanPhone }
        });

        if (number) {
            return res.status(400).send({ message: "El número de teléfono ya está registrado." });
        }

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
        });

        return res.json(newUser.id);

    } catch (error) {
        console.error("Error en el registro:", error);
        return res.status(500).send({ message: "Error interno del servidor al procesar el registro." });
    }
}
