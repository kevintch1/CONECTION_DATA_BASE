import type { Request, Response } from "express";
import {
    getAllProducts,
    getProductById,
    insertProduct,
    updateProduct
} from "../models/product.model.js";

//get por obetner todos los datos
export async function getMenu(req: Request, res: Response) {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Obtener todos los productos' */
    try {
        const products = await getAllProducts();
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