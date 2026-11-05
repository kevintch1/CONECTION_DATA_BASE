
import pool from "../config/db.js";

// Obtener todos los clientes
export async function getAllCustomers() {
    const result = await pool.query(
        "SELECT * FROM cliente ORDER BY id ASC"
    );

    return result.rows;
}

// Obtener un cliente por ID
export async function getCustomerById(id: number) {
    const result = await pool.query(
        "SELECT * FROM cliente WHERE id = $1",
        [id]
    );

    return result.rows[0] ?? null;
}

// Crear un cliente
export async function insertCustomer(
    nombre: string,
    ap_paterno: string,
    ap_materno: string,
    email: string,
    telefono: string
) {
    const result = await pool.query(
        `INSERT INTO cliente
        (nombre, ap_paterno, ap_materno, email, telefono)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [nombre, ap_paterno, ap_materno, email, telefono]
    );

    return result.rows[0];
}

// Actualizar un cliente
export async function updateCustomer(
    id: number,
    nombre: string,
    ap_paterno: string,
    ap_materno: string,
    email: string,
    telefono: string
) {
    const result = await pool.query(
        `UPDATE cliente
         SET nombre = $1,
             ap_paterno = $2,
             ap_materno = $3,
             email = $4,
             telefono = $5
         WHERE id = $6
         RETURNING *`,
        [nombre, ap_paterno, ap_materno, email, telefono, id]
    );

    return result.rows[0] ?? null;
}
