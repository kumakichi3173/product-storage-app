import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useProductStore } from '../stores/useProductStore'
import ProductCard from '../components/ProductCard';
import { Toaster } from "@/components/ui/toaster"


const HomePage = () => {

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products)

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
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id} //key cannot be referenced, which is why this exists separately
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
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
