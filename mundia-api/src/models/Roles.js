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
    }, 
},
{
    timestamps: false,
});