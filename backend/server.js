import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

// call the function
const app = express();
const PORT = process.env.PORT || 3000;

// middleware that allows us to parse the request
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:3000');
});
