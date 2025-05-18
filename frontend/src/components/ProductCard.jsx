import { Box, Heading, IconButton, HStack, Image, Text, Button, Container, Input, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from '../components/ui/color-mode';
import { deleteProduct } from '../stores/deleteProduct';
import { Dialog } from "@chakra-ui/react"
import { Portal } from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/react';

const ProductCard = ({ id, image, name, price, onEditClick }) => {
    const textColor = useColorModeValue('gray.600', 'gray.200');

    useEffect(() => {
        console.log(" ProductCard rendered: ", id);
    }, []);

    const [updatedProduct, setUpdatedProduct] = useState({ image, name, price });
    
    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
    };

    return (
        <>
            <Box h="100%" p={2}>
                <Box
                    h="100%"
                    maxW="450px"
                    shadow='lg'
                    rounded='lg'
                    overflow='hidden'
                    transition='all 0.3s'
                    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
                    bg={useColorModeValue("white", "gray.700")}
                    position="relative"
                >
                    <Box position="absolute" top="2" right="2" zIndex="1">
                        <HStack spacing={1}>
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <IconButton
                                        onClick={() => onEditClick({ id, image, name, price })}
                                        aria-label="Edit"
                                        variant="ghost"
                                    >
                                        <FiEdit />
                                    </IconButton>
                                </Dialog.Trigger>
                                <Portal>
                                    <Dialog.Backdrop />
                                    <Dialog.Positioner>
                                        <Dialog.Content>
                                            <Dialog.Header>
                                            </Dialog.Header>
                                            <Dialog.Title as="h1" fontSize='2xl' textAlign="center" mb={8} fontWeight={"bold"}>Update Product</Dialog.Title>
                                            <Dialog.Body>
                                                <Container maxW={"container.sm"}>
                                                        <VStack spacing={4}>
                                                            <Input
                                                                placeholder='Product Name'
                                                                name='name'
                                                                value={updatedProduct.name}
                                                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                            />
                                                            <Input
                                                                placeholder='Price'
                                                                name='price'
                                                                value={updatedProduct.price}
                                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                            />
                                                            <Input
                                                                placeholder='Image URL'
                                                                name='image'
                                                                value={updatedProduct.image}
                                                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                                            />
                                                        </VStack>
                                                </Container >
                                            </Dialog.Body>
                                            <Dialog.Footer>
                                                <Dialog.ActionTrigger asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </Dialog.ActionTrigger>
                                                <Button>Save</Button>
                                            </Dialog.Footer>
                                            <Dialog.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Content>
                                    </Dialog.Positioner>
                                </Portal>
                            </Dialog.Root>
                            <IconButton
                                onClick={() => handleDeleteProduct(id)}
                                aria-label="Delete"
                                variant="ghost"
                            >
                                <MdDelete />
                            </IconButton>
                        </HStack>
                    </Box>
                    <Image src={image} alt={name} h={48} w='full' objectFit='cover' />
                    <Box p={4}>
                        <Heading as='h3' size='md' mb={2}>
                            {name}
                        </Heading>
                        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                            ${price}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProductCard;