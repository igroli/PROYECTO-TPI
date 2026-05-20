import { Router } from "express";
import {
  createProperty,
  getProperties,
  getProperty,
  getCarrouselProperties,
  getPropertiesFiltered,
} from "../services/properties.services.js";

const router = Router();

router.get("/randomhouses", getCarrouselProperties);

router.get("/house/:id", getProperty);

router.get("/propiedades", getPropertiesFiltered);

router.post("/houses", createProperty);

router.put("/houses/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando propiedad con id: ${id}`);
});

router.delete("/houses/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Borrando propiedad con id: ${id}`);
});
export default router;
