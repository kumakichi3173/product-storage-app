import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const handleAddProduct = async () => {
        try {
            if (!newProduct.name || !newProduct.image || !newProduct.price) {
                throw new Error("Error parsing product")
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
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
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
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
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
        </Container>
    )
}

export default CreatePage