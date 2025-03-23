import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." }
        }


        try {
            console.log("Sending newProduct:", newProduct);
            const productToSend = {
                ...newProduct,
                price: Number(newProduct.price)
            };

            // can skip adding http://localhost:3000 because of proxy: { "/api": { target: "http://localhost:3000" in vite.config.js           
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productToSend),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server returned error:", res.status, errorText);
                throw new Error("Server error");
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product successfully created." };
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: error.message };
        }
    },
}));

