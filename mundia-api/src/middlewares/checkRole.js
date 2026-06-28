import { Roles } from "../models/Roles.js"
import { Users } from "../models/Users.js"


export const checkRoles = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = req.usuario;

            if(!user) {
                return res.status(403).json({ message: "Acceso denegado. Usuario o rol no encontrado."});
            } 
            const roleObtained = await Roles.findByPk(user.id_roles);

            if(!roleObtained) {
                return res.status(300).json({ message: "Acceso denegado. Rol del usuario no encontrado"});
            }
            const hasPermission = allowedRoles.includes(roleObtained.name);

            if(!hasPermission) {
                return res.status(403).json({ message: "Acceso denegado: No posee los permisos necesarios."});
            }

            req.userRole = roleObtained.name;
            next();
        }   catch (error) {
            console.error("Error en checkRoles:", error);
            return res.status(500).json({ message: "Error en la verificación de roles."});
        }
    }
}