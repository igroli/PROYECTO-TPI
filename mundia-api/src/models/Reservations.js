import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Reservations = sequelize.define("Reservations", {
    id_reservations: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reservation_date: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM('Confirmada', 'Cancelada', 'Pendiente de confirmación', 'Finalizada'),
        allowNull: false,
    }
});