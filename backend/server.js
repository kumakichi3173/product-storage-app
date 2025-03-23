import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

// call the function
const app = express();
// CORS を有効にする (グローバルミドルウェアとして CORS を設定)
app.use(cors());

// middleware that allows us to parse the request
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
