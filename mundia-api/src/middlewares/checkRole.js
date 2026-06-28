import { Roles } from "../models/Roles"
import { Users } from "../models/Users"


export const checkRoles = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = await Users.findByPk(req.userId, {
                include: [{model: Roles}]
            });

            if(!user || !user.rol) {
                return res.status(403).json({ message: "Acceso denegado. Usuario o rol no encontrado."});
            } 

            const hasPermission = allowedRoles.includes(user.role.name);

            if(!hasPermission) {
                return res.status(403).json({ message: "Acceso denegado: No posee los permisos necesarios."});
            }

            next();
        }   catch (error) {
            return res.status(500).json({ message: "Error en la verificación de roles."});
        }
    }
}