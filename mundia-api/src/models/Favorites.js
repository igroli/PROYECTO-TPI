import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Favorites = sequelize.define("Favorites", {
    date_added: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
{
    timestamps: false,
});