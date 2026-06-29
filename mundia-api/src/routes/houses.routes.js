import { Router } from "express";
import {
  createProperty,
  getProperties,
  getProperty,
  getCarrouselProperties,
  getPropertiesFiltered,
  updateProperty,
  deleteProperty
} from "../services/properties.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkRoles } from "../middlewares/checkRole.js";

const router = Router();

router.get("/houses", getProperties);

router.get("/randomhouses", getCarrouselProperties);

router.get("/house/:id", getProperty);

router.get("/propiedades", getPropertiesFiltered);

router.post("/houses", createProperty);

// solo para agents y admin
router.put("/houses/:id", verifyToken, checkRoles('Admin', 'Agent'), updateProperty);
// solo para agents y admin
router.delete("/houses/:id", verifyToken, checkRoles('Admin', 'Agent'), deleteProperty);
export default router;
