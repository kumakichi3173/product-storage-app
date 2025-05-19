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
      return { success: false, message: data.message };
    }

    return { success: true, data: data.data };
  } catch (err) {
    console.error("Failed to update product", err);
    return { success: false, message: "An error occurred" };
  }
};