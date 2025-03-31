import { Container, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const HomePage = () => {
  return (
    <Container maxW='container .xl' py={12}>
      <VStack spacing={8}>
      <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 💍
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage
