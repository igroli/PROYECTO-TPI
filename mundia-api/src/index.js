import express from "express";
import housesRoutes from "./routes/houses.routes.js";
import authRoutes from "./routes/auth.routes.js";
import agentsRoutes from "./routes/agents.routes.js";
import { PORT } from "./config.js";
import { sequelize } from "../db.js";
import "./models/associations.js";

const app = express();

async function createDB() {
  try {
    app.use(express.json());
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    });
    
    app.use(housesRoutes);
    app.use(authRoutes);
    app.use(agentsRoutes);
    
    app.listen(PORT);

    await sequelize.sync({ alter: true });
    console.log("Data base succesfully synchronized!");

    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.log(`There was an error on initialization`, error);
  }
}

createDB();
