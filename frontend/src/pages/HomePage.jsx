import { Container, SimpleGrid, Text, VStack, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useProductStore } from '../stores/useProductStore'
import ProductCard from '../components/ProductCard';
import { Toaster } from "@/components/ui/toaster"
import { useDisclosure } from '@chakra-ui/react'
import { updateProduct } from '../stores/updateProduct';
import { deleteProduct } from '../stores/deleteProduct';

const HomePage = () => {

  const { products, fetchProducts, setProducts } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formError, setFormError] = useState("");

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const isUnchanged =
      updatedProduct.name === selectedProduct.name &&
      updatedProduct.price === selectedProduct.price &&
      updatedProduct.image === selectedProduct.image;

    if (isUnchanged) {
      setFormError("Nothing has been modified.");
      return;
    }

    setFormError("");

    const result = await updateProduct(id, updatedProduct);
    if (result && result.success) {
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, ...updatedProduct, _id: product._id } : product
        )
      );
      onClose();
      return result;
    } else {
      return result;
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxW='container.xl' pt={12}>
      <Toaster />
      <VStack
        spacing={8}
      >
        <Heading as="h1" fontSize='4xl' textAlign="center" mb={8} fontWeight={"bold"}>
          ⚜️Current Products⚜️
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          w={"full"}
        >
          {products.map((product, index) => {
            return (
              <ProductCard
                key={product._id}
                //key cannot be referenced, which is why this exists separately
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                onEditClick={handleEditClick}
                onEditSubmit={handleUpdateProduct}
                onDelete={handleDeleteProduct}
                formError={formError}
              />
            );
          })}
        </SimpleGrid>
        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            Product not found {" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a new product 💍
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage