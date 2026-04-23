import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Agents = sequelize.define("Agents", {
    id_agents: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, 
{
    timestamps: false,
});