
import type { Request, Response } from "express";

import {
    getAllCustomers,
    getCustomerById,
    insertCustomer,
    updateCustomer
} from "../models/customer.model.js";

// 1. Obtener todos los clientes
export async function getCustomers(req: Request, res: Response) {
    try {
        const customers = await getAllCustomers();

        return res.json(customers);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Error al obtener los clientes"
        });
    }
}

// 2. Obtener un cliente por ID
export async function getCustomer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un número entero positivo"
        });
    }

    try {
        const customer = await getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        return res.json(customer);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error al obtener el cliente"
        });
    }
}

// 3. Crear un cliente
export async function createCustomer(req: Request, res: Response) {
    const {
        nombre,
        ap_paterno,
        ap_materno,
        email,
        telefono
    } = req.body;

    try {
        const customer = await insertCustomer(
            nombre,
            ap_paterno,
            ap_materno,
            email,
            telefono
        );

        return res.status(201).json({
            message: "Cliente creado exitosamente",
            data: customer
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error al crear el cliente"
        });
    }
}

// 4. Actualizar un cliente
export async function editCustomer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un número entero positivo"
        });
    }

    const {
        nombre,
        ap_paterno,
        ap_materno,
        email,
        telefono
    } = req.body;

    try {
        const customer = await updateCustomer(
            id,
            nombre,
            ap_paterno,
            ap_materno,
            email,
            telefono
        );

        if (!customer) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        return res.json({
            message: "Cliente actualizado exitosamente",
            data: customer
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Error al actualizar el cliente"
        });
    }
}
