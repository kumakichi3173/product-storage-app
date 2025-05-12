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
            >
                <Image src={image} alt={name} h={48} w='full' objectFit='cover' />
                <Box p={4}>
                    <Heading as='h3' size='md' mb={2}>
                        {name}
                    </Heading>

                    <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                        ${price}
                    </Text>
                    <HStack spacing={2}>
                    {/* TODO: The positon of the icons are not great. Move to top right on the pic */}
                    <IconButton
                    // TODO: handleEditProduct(id)}
                        onClick={() => handleEditProduct(id)}
                        aria-label="Edit"
                        variant="ghost"
                        fontSize="24px"
                    >
                            <FiEdit />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDeleteProduct(id)}
                            aria-label="Delete"
                            variant="ghost"
                            fontSize="24px"
                        >
                            <MdDelete />
                        </IconButton>
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductCard;