import type { Request, Response } from "express";
import {
    getAllProducts,
    getProductById,
    insertProduct,
    updateProduct
} from "../models/product.model.js";

//get por obetner todos los datos
// Obtener productos con filtro y paginación
export async function getMenu(req: Request, res: Response) {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Obtener productos con filtros y paginación' */
    try {
        const maxPriceQuery = req.query.maxPrice;
        const pageQuery = req.query.page;
        const limitQuery = req.query.limit;

        let maxPrice: number | undefined;

        if (maxPriceQuery !== undefined) {
            if (typeof maxPriceQuery !== "string" || maxPriceQuery.trim() === "") {
                res.status(400).json({ error: "maxPrice debe ser un número válido" });
                return;
            }

            maxPrice = Number(maxPriceQuery);

            if (!Number.isFinite(maxPrice) || maxPrice < 0) {
                res.status(400).json({ error: "maxPrice debe ser mayor o igual a 0" });
                return;
            }
        }

        const page = pageQuery === undefined ? 1 : Number(pageQuery);
        const limit = limitQuery === undefined ? 10 : Number(limitQuery);

        if (!Number.isInteger(page) || page < 1) {
            res.status(400).json({ error: "page debe ser un entero mayor que 0" });
            return;
        }

        if (!Number.isInteger(limit) || limit < 1) {
            res.status(400).json({ error: "limit debe ser un entero mayor que 0" });
            return;
        }

        const products = await getAllProducts(maxPrice, page, limit);

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}
//get obtener por id
export async function getProduct(req: Request, res: Response) {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Obtener producto por ID' */
    try {
        const id = Number(req.params.id);
        const product = await getProductById(id);

        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}

//post es de crear
export async function createProduct(req: Request, res: Response) {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Crear un producto' */
    try {
        const { nombre, descripcion, precio } = req.body;

        const product = await insertProduct(
            nombre,
            descripcion,
            precio
        );

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}

//put de actualizar
export async function updateProductController(req: Request, res: Response) {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Actualizar un producto' */
    try {
        const id = Number(req.params.id);
        const { nombre, descripcion, precio } = req.body;

        const product = await updateProduct(
            id,
            nombre,
            descripcion,
            precio
        );

        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}