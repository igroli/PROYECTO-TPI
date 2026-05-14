// verificar si falta algun import o si los que estan son los correctos
import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Roles = sequelize.define("Roles", {

    id_roles: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.ENUM(
            "Admin",
            "Agent",
            "Client"
        ),
        allowNull: false,
        defaultValue: "Client"
    } ,

    description: {
        // atributo que ayuda a una mejor documentacion 
        // (no es 100% necesaria pero si es util)

        type: DataTypes.STRING
        // junto a esta tabla podemos hacer validacion para que se auto complete
        // dependiendo que rol tenga y de una explicacion abreviada del rol
        // sino la sacamos a la MIERDA
    },

    
    //  falta el atributo permissions (definimos que puede hacer cada rol)


},
{
    timestamps: false,
});