import express from "express";
import housesRoutes from "./routes/houses.routes.js";
import { PORT } from "./config.js";
import { sequelize } from "../db.js";
import "./models/associations.js";

const app = express();
async function createDB() {
  try {
    app.use(express.json());
    app.listen(PORT);
    app.use(housesRoutes);

    await sequelize.sync();
    console.log("Data base succesfully synchronized!");

    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.log(`There was an error on initialization`);
  }
}

createDB();
