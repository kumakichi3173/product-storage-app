"use client"

import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { toaster, Toaster } from "@/components/ui/toaster"

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const handleAddProduct = async () => {
        try {
            if (!newProduct.name || !newProduct.image || !newProduct.price) {
                toaster.create({
                    title: "Error",
                    description: "All fields are required",
                    status: "error",
                    duration: 5000,
                    type: "error",
                    isClosable: true,
                });
                return;
            } else {
                toaster.create({
                    title: "Success",
                    description: "Product has been successfully created",
                    status: "success",
                    duration: 5000,
                    type: "success",
                    isClosable: true,
                });
            }

            // clear the state from the form  
            setNewProduct({ name: "", price: "", image: "" });

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error("Server error");
            }
        } catch (error) {
        }
    };

    return (
        <Container maxW={{ base: "100%", xl: "940px" }} pt={12}>
            <Toaster />
            <VStack
                spacing={8}
            >
                <Heading as="h1" fontSize='4xl' textAlign="center" mb={8} fontWeight={"bold"}>
                    ⚜️Create New Product⚜️
                </Heading>
                <Box
                    w="full"
                    bg={useColorModeValue("white", "gray.700")}
                    p={6}
                    rounded="lg"
                    shadow='lg'
                >
                    <VStack spacing={4}>
                        <Input
                            width="98%"
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            width="98%"
                            placeholder='Price'
                            name='price'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            width="98%"
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <Button
                            colorScheme='blue'
                            onClick={handleAddProduct}
                            w='fit-content'
                            bg={useColorModeValue("black", "gray.300")}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container >
    )
}

export default CreatePage