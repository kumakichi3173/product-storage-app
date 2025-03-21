import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { useColorMode } from './color-mode';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140PX"} px={4}>
      <Flex h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          color="white"
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r" gradientFrom="purple.700" gradientTo="pink.500"
          bgClip={"text"}
        >
          <Link to={"/"}>✨Product Storage✨</Link>
        </Text>
        <HStack spacing={2} alignItem={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container >
  )
}

export default Navbar
