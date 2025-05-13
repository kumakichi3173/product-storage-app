import { Box, Heading, IconButton, HStack, Image, Text } from '@chakra-ui/react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from '../components/ui/color-mode';
import { deleteProduct } from '../stores/deleteProduct';

const ProductCard = ({ id, image, name, price }) => {
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
    };

    return (
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
                        <IconButton
                            onClick={() => handleEditProduct(id)}
                            aria-label="Edit"
                            variant="ghost"
                        >
                            <FiEdit />
                        </IconButton>
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
    );
};

export default ProductCard;