import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

// call the function
const app = express();

// middleware that allows us to parse the request
app.use(express.json());

app.post("/api/products", async (req, res) => {
    // user will send this data and req.body holds the JSON data that has been parsed by the middleware
    const product = req.body;

    // if any of these are empty
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(3000, () => {
    connectDB();
    console.log('Server started at http://localhost:3000');
});
