import express from 'express';
import housesRoutes from "./routes/houses.routes.js"
import { PORT } from './config.js';

const app = express();
try {
app.listen(PORT);
app.use(housesRoutes);
console.log(`Server listening on port ${PORT}`)
} catch (error) {
    console.log(`There was an error on initialization`);
}