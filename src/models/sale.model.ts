
import pool from "../config/db.js";

//Tipo de cada producto incluido en el pedido
export interface SaleItem {
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
}

//Obtener todas las ventas con sus clientes
export async function getAllSales() {
    const result = await pool.query(`
        SELECT
            p.id,
            p.nro_de_compra,
            p.fecha,
            p.total_pagar,
            p.estado,
            p.id_cliente,
            c.nombre AS nombre_cliente,
            c.ap_paterno,
            c.ap_materno
        FROM pedido p
        INNER JOIN cliente c
            ON p.id_cliente = c.id
        ORDER BY p.id ASC
    `);

    return result.rows;
}

//Obtener una venta por ID
export async function getSaleById(id: number) {
    const result = await pool.query(
        `
        SELECT
            p.id,
            p.nro_de_compra,
            p.fecha,
            p.total_pagar,
            p.estado,
            p.id_cliente,
            c.nombre AS nombre_cliente,
            c.ap_paterno,
            c.ap_materno
        FROM pedido p
        INNER JOIN cliente c
            ON p.id_cliente = c.id
        WHERE p.id = $1
        `,
        [id]
    );

    return result.rows[0] ?? null;
}

//Crear una venta sencilla
export async function insertSale(
    nro_de_compra: number,
    fecha: string,
    total_pagar: number,
    id_cliente: number,
    estado: string
) {
    const result = await pool.query(
        `
        INSERT INTO pedido (
            nro_de_compra,
            fecha,
            total_pagar,
            id_cliente,
            estado
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [nro_de_compra, fecha, total_pagar, id_cliente, estado]
    );

    return result.rows[0];
}

//Crear pedido y detalles mediante una transacción
export async function insertSaleWithDetails(
    nro_de_compra: number,
    fecha: string,
    id_cliente: number,
    estado: string,
    items: SaleItem[]
) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        //Calcular el total del pedido
        const total_pagar = items.reduce(
            (total, item) =>
                total + item.cantidad * item.precio_unitario,
            0
        );

        //Insertar el pedido
        const saleResult = await client.query(
            `
            INSERT INTO pedido (
                nro_de_compra,
                fecha,
                total_pagar,
                id_cliente,
                estado
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                nro_de_compra,
                fecha,
                total_pagar,
                id_cliente,
                estado
            ]
        );

        const sale = saleResult.rows[0];

        //Insertar los detalles del pedido
        for (const item of items) {
            await client.query(
                `
                INSERT INTO detalle_pedido (
                    cantidad,
                    precio_unitario,
                    id_pedido,
                    id_producto
                )
                VALUES ($1, $2, $3, $4)
                `,
                [
                    item.cantidad,
                    item.precio_unitario,
                    sale.id,
                    item.id_producto
                ]
            );
        }

        await client.query("COMMIT");

        return sale;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } finally {
        client.release();
    }
}
