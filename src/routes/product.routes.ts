import { Router } from "express";
import {
    getMenu,
    getProduct,
    createProduct,
    updateProductController
} from "../controllers/product.controllers.js"

const productRouter: Router = Router();

productRouter.get("/menu", getMenu);
productRouter.get("/menu/:id", getProduct);
productRouter.post("/menu", createProduct);
productRouter.put("/menu/:id", updateProductController);

export default productRouter;