
import type { Request, Response } from "express";

import {
    getAllSales,
    getSaleById,
    insertSaleWithDetails
} from "../models/sale.model.js";

// Obtener todas las ventas
export async function getSales(req: Request, res: Response) {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Obtener todas las ventas con sus clientes' */
    try {
        const sales = await getAllSales();
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}

// Obtener una venta por ID
export async function getSale(req: Request, res: Response) {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Obtener una venta por ID' */
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            res.status(400).json({ error: "ID de venta inválido" });
            return;
        }

        const sale = await getSaleById(id);

        if (!sale) {
            res.status(404).json({ error: "Venta no encontrada" });
            return;
        }

        res.json(sale);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}

// Crear una venta con sus detalles
export async function createSale(req: Request, res: Response) {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Crear una venta con sus detalles mediante una transacción' */
    try {
        const {
            nro_de_compra,
            fecha,
            id_cliente,
            estado,
            items
        } = req.body;

        if (
            !Number.isInteger(nro_de_compra) ||
            !Number.isInteger(id_cliente) ||
            id_cliente < 1 ||
            !fecha ||
            typeof estado !== "string" ||
            estado.trim() === "" ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            res.status(400).json({ error: "Datos de venta inválidos" });
            return;
        }

        const itemsValidos = items.every((item: any) =>
            Number.isInteger(item.id_producto) &&
            item.id_producto > 0 &&
            Number.isInteger(item.cantidad) &&
            item.cantidad > 0 &&
            Number.isFinite(item.precio_unitario) &&
            item.precio_unitario > 0
        );

        if (!itemsValidos) {
            res.status(400).json({ error: "Los detalles del pedido son inválidos" });
            return;
        }

        const sale = await insertSaleWithDetails(
            nro_de_compra,
            fecha,
            id_cliente,
            estado,
            items
        );

        res.status(201).json(sale);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servicio" });
    }
}
