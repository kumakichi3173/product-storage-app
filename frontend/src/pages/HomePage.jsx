import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
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

  const handleEditClick = (product) => {
    console.log(" handleEditClick is triggered as expected :", product);

    setSelectedProduct(product);
    onOpen();
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const result = await updateProduct(id, updatedProduct);
    if (result.success) {
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, ...updatedProduct, _id: product._id } : product
        )
      );
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
    <Container maxW='container.xl' py={12}>
      <Toaster />
      <VStack spacing={8}>
        <Text
          fontSize='3xl'
          fontWeight="bold"
        >
          Current Products
        </Text>

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