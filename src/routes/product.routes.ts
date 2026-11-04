import { Router } from "express";
import { validateProduct } from "../middlewares/validate-product.js";
import {
    getMenu,
    getProduct,
    createProduct,
    updateProductController
} from "../controllers/product.controllers.js"

const productRouter: Router = Router();

productRouter.get("/menu", getMenu);
productRouter.get("/menu/:id", getProduct);
productRouter.post("/menu", validateProduct, createProduct); productRouter.put("/menu/:id", updateProductController);

export default productRouter;