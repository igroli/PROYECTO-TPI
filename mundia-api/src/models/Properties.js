import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Properties = sequelize.define("Properties", {
    id_properties: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    type_property: {
        type: DataTypes.ENUM('Casa', 'Departamento'),
        defaultValue: 'Departamento'
    },
    type_transactions: {
        type: DataTypes.ENUM('Venta', 'Alquiler'),
        defaultValue: 'Alquiler'
    },
    price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    square_mts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    bathroom: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});