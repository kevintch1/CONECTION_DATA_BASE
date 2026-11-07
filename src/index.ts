
import express from "express";
import swaggerRouter from "./routes/swagger.router.js";
import productRouter from "./routes/product.routes.js";
import saleRouter from "./routes/sale.routes.js";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/docs", swaggerRouter);
app.use("/api", productRouter);
app.use("/api", saleRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});
