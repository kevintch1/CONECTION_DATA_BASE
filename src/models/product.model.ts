import pool from "../config/db.js";

//obetener
export async function getAllProducts() {
    const result = await pool.query("SELECT * FROM producto");
    return result.rows;
}

//obtener por id
export async function getProductById(id: number) {
    const result = await pool.query(
        "SELECT * FROM producto WHERE id = $1",
        [id]
    );

    return result.rows[0] ?? null;
}

//crear un producto
export async function insertProduct(
    name: string,
    description: string,
    price: number
) {
    const result = await pool.query(
        `INSERT INTO producto (nombre, descripcion, precio)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, description, price]
    );

    return result.rows[0];
}

//actualizar produt
export async function updateProduct(
    id: number,
    name: string,
    description: string,
    price: number
) {
    const result = await pool.query(
        `UPDATE producto
         SET nombre = $1, descripcion = $2, precio = $3
         WHERE id = $4
         RETURNING *`,
        [name, description, price, id]
    );

    return result.rows[0] ?? null;
}