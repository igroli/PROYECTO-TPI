import { Users } from "./Users.js";
import { Properties } from "./Properties.js";
import { Agents } from "./Agents.js";
import { Reservations } from "./Reservations.js";
import { Roles } from "./Roles.js";

// relacion agentes propiedades
Agents.hasMany(Properties, {
    foreignKey: 'id_agents'
});

Properties.belongsTo(Agents, {
    foreignKey: 'id_agents'
});

// relacion propiedades reservas
Properties.hasMany(Reservations, {
    foreignKey: 'id_properties',
     onDelete: 'CASCADE'
    });

Reservations.belongsTo(Properties, {
    foreignKey: 'id_properties'
});

//relacion clientes reservas
Users.hasMany(Reservations,{
    foreignKey: 'id_users', 
    onDelete: 'CASCADE'
});

Reservations.belongsTo(Users, {
    foreignKey: 'id_users'
});

//realacion agente reservas
Agents.hasMany(Reservations,{
    foreignKey: 'id_agents', 
    onDelete: 'CASCADE'
});

Reservations.belongsTo(Agents, {
    foreignKey: 'id_agents'
});

//relacion roles usuarios
Roles.hasMany(Users, {
    foreignKey: 'id_roles',
    as: 'rol',
});

Users.belongsTo(Roles, {
    foreignKey: 'id_roles',
    as: 'rol',
    onDelete: "CASCADE"
});

// relacion users agents
Users.hasOne(Agents, { foreignKey: 'id_users', onDelete: 'CASCADE' });
Agents.belongsTo(Users, { foreignKey: 'id_users' });
