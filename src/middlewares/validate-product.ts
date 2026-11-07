import type { Request, Response, NextFunction } from "express";
import { productSchema } from "../schemas/product.schema.js";

export function validateProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: "error",
            message: "Error de validación en los datos enviados",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
}