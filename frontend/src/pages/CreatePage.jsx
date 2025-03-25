"use client"

import { Box, Button, Container, Heading, Input, VStack, HStack, For } from '@chakra-ui/react'
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
                    description: "Data has been successfully updated",
                    status: "success",
                    duration: 5000,
                    type: "success",
                    isClosable: true,
                });
            }

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server returned error:", res.status, errorText);
                throw new Error("Server error");
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <Toaster />
            <VStack
                spacing={8}
            >
                <Heading as="h1" size="4xl" textAlign="center" mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w="full"
                    bg={useColorModeValue("white", "gray.700")}
                    p={6}
                    rounded="lg"
                    shadow="md"
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            autoComplete="product-name"
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            autoComplete="price"
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            autoComplete="image"
                        />
                        <Button
                            colorScheme='blue'
                            onClick={handleAddProduct}
                            w='full'
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