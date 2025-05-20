import { toaster } from "@/components/ui/toaster";

export const updateProduct = async (id, updatedProduct) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();
    if (!data.success) {
      toaster.create({
        title: "Error",
        description: "Failed to update the product",
        status: "error",
        duration: 5000,
        type: "error",
        isClosable: true,
      });
      return { success: false, message: data.message };
    }

    toaster.create({
      title: "Success",
      description: "Product has been successfully updated",
      status: "success",
      duration: 5000,
      type: "success",
      isClosable: true,
    });

    return { success: true, data };
  } catch (error) {
  }
};