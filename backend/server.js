import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path"

// read the contents of .env file into process.env
dotenv.config();

// call the function
const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();

// CORS を有効にする (グローバルミドルウェアとして CORS を設定)
app.use(cors());

// middleware that allows us to parse the request
app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

if (process.env.NODE_ENV === "development") {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

app.listen(PORT, () => {
    connectDB();
});
