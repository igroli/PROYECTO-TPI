//relacion propiedad reservas

import { Users } from "./Users";
import { Properties } from "./Properties";
import { Agents } from "./Agents";
import { Reservations } from "./Reservations";
import { Favorites } from "./Favorites";

Properties.hasMany(Reservations, {foreignKey: 'id_properties', onDelete: 'CASCADE'});
Reservations.belongsTo(Properties, {foreignKey: 'id_properties'});

//relacion clientes reservas
Users.hasMany(Reservations,{foreignKey: 'id_users', onDelete: 'CASCADE'});
Reservations.belongsTo(Users, {foreignKey: 'id_users'});

//realacion agente reservas
Agents.hasMany(Reservations,{foreignKey: 'id_agents', onDelete: 'CASCADE'});
Reservations.belongsTo(Agents, {foreignKey: 'id_agents'});

//tabla intermedia favoritos
Users.belongsToMany(Properties, {through: 'Favorites', foreignKey: 'id_users', otherKey: 'id_properties',as:"favoriteProperties", onDelete: 'CASCADE'});
Properties.belongsToMany(Users, {through: 'Favorites', foreignKey: 'id_properties', otherKey:'id_users',as:"favoritedByUsers", onDelete: 'CASCADE'});

