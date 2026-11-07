import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Esquema de validación del cliente
export const customerSchema = z.object({
    nombre: z.string().trim().min(1, "El nombre es obligatorio"),

    ap_paterno: z.string().trim().min(1, "El apellido paterno es obligatorio"),

    ap_materno: z.string().trim().min(1, "El apellido materno es obligatorio"),

    email: z.string().trim().email("El correo electrónico no es válido"),

    telefono: z.string().trim().min(1, "El teléfono es obligatorio"),
});

// Middleware de validación
export async function validateCustomer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        req.body = await customerSchema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const flattened = z.flattenError(error);

            return res.status(400).json({
                status: "error",
                message: "Error de validación en los datos enviados",
                errors: flattened.fieldErrors,
            });
        }

        next(error);
    }
}