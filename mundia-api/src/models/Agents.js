import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Agents = sequelize.define("Agents", {
    id_agents: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, 
{
    timestamps: false,
});