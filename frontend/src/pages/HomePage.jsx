import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useProductStore } from '../stores/useProductStore'

const HomePage = () => {

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products)

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize='3xl'
          fontWeight="bold"
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
        </SimpleGrid>

        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          Prodct not found {" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
              Create a new product 💍
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage
