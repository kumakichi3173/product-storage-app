import { Container, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const HomePage = () => {
  return (
    <Container maxW='container .xl' py={12}>
      <VStack spacing={8}>
      <Text
            fontSize='3xl'
          fontWeight={"bold"}
          // bgGradient={"linear(to-r, cyan.400, blue.500)"}
          // bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 💍
        </Text>

        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        Prodct not found {" "}   
        <Link to ={"/create"}>
        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
          Create a product
        </Text>
        </Link>       
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage
