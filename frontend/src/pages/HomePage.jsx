import { Container, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize='3xl'
          fontWeight="bold"
        >
          Current Products
        </Text>

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
