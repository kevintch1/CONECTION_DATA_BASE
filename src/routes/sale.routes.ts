
import { Router } from "express";

import {
    getSales,
    getSale,
    createSale
} from "../controllers/sale.controller.js";

const saleRouter: Router = Router();

saleRouter.get("/sales", getSales);

saleRouter.get("/sales/:id", getSale);

saleRouter.post("/sales", createSale);

export default saleRouter;
