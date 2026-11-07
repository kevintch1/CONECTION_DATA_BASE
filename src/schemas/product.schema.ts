import { z } from "zod";

export const productSchema = z.object({
    nombre: z.string().trim().min(1, "El nombre no puede estar vacío"),
    descripcion: z.string().trim().min(1, "La descripción no puede estar vacía"),
    precio: z.number().positive("El precio debe ser mayor a cero"),
});