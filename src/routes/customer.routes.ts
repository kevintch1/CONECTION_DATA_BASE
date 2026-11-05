import { Router } from "express";

import {
    getCustomers,
    getCustomer,
    createCustomer,
    editCustomer
} from "../controllers/customer.controllers.js";

import { validateCustomer } from "../middlewares/validate_customer.js";

const router: Router = Router();

// Obtener todos los clientes
router.get("/customers", getCustomers);

// Obtener un cliente por ID
router.get("/customers/:id", getCustomer);

// Crear un cliente
router.post("/customers", validateCustomer, createCustomer);

// Actualizar un cliente
router.put("/customers/:id", validateCustomer, editCustomer);

export default router;