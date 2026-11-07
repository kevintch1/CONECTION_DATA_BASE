import pool from "../config/db.js";

//obetener
// Obtener productos con filtro y paginación
export async function getAllProducts(
    maxPrice?: number,
    page: number = 1,
    limit: number = 10
) {
    let sql = "SELECT * FROM producto";
    const values: number[] = [];

    if (maxPrice !== undefined) {
        values.push(maxPrice);
        sql += ` WHERE precio <= $${values.length}`;
    }

    const offset = (page - 1) * limit;

    values.push(limit);
    const limitIndex = values.length;

    values.push(offset);
    const offsetIndex = values.length;

    sql += ` ORDER BY id LIMIT $${limitIndex} OFFSET $${offsetIndex}`;

    const result = await pool.query(sql, values);

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