import { toaster } from "@/components/ui/toaster";

export const deleteProduct = async (id) => {
    try {
        if (!id) {
            toaster.create({
                title: "Error",
                description: "Product ID is required",
                status: "error",
                duration: 5000,
                type: "error",
                isClosable: true,
            });
            return;
        }

        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error("Server error");
        }

        toaster.create({
            title: "Success",
            description: "Product has been successfully deleted",
            status: "success",
            duration: 5000,
            type: "success",
            isClosable: true,
        });
    } catch (error) {
    }
};